const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

const UserService =require('../services/user.service');
const TaskService = require('../services/task.service');



const userService = new UserService();
const taskService = new TaskService();

class PomodoroService {

  async create(data){

    const newPomodoro = await models.Pomodoro.create(data);
    return newPomodoro;
  };

  async findOne(id){
    const pomodoro = await models.Pomodoro.findByPk(id);
    if(!pomodoro){
      throw boom.notFound('pomodoro not found');
    };
    return pomodoro;
  };

  async findByUser(userId){
    const pomodoros = await models.Pomodoro.findAll({
      where: { userId },
      include: ['task']
    });
    if(!pomodoros){
      throw boom.notFound('pomodoros not found');
    }
    return pomodoros;
  };

  async update(id, data){

    const pomodoro = await this.findOne(id);
    const rta = await pomodoro.update(data);
    return rta;

  };

  async delete(id){
    const pomodoro = await this.findOne(id);
    const rta = await pomodoro.destroy();
    return rta;
  }



  async createByUser(userId, body){
      var user = await userService.findOne(userId);
      var task;
      async function userAfterCreateTask (uId){
        const newTask = await taskService.create({userId: uId}); // creamos la tarea sin titulo
        await userService.update(uId, {currentTaskId: newTask.id}); // actualizamos datos de usuario agregandole id de task actual
        const user = await userService.findOne(uId); // redefinimosa user para tener los datos actualizados en user
        return user;
      };

      if(!user.currentTaskId){  //evaluamos si usuario tiene asociado una tarea actual
        user = await userAfterCreateTask(userId);
      }else{
        try{
          task = await taskService.findOne(user.currentTaskId);
        }catch(err){
          await userService.update(userId, {currentTaskId: null});
          user = await userAfterCreateTask(userId);
        }
      };
      if(task?.pomodoro){
        await this.update(task.pomodoro.id, {taskId: null, run: false})
      }
      const data = {
        value:  body.value || user.config.pomodoro,
        userId: user.id,
        taskId: user.currentTaskId // sería ek
      };

      const newPomodoro = await this.create(data);
      return newPomodoro;
  };

};

module.exports = PomodoroService;
