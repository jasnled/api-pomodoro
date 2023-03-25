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



  async createByUser(userId){
      var user = await userService.findOne(userId);

      async function createTaskToPomodoro (uId){

        const newTask = await taskService.create({userId: uId}); // creamos la tarea sin titulo
        await userService.update(uId, {currentTaskId: newTask.id}); // actualizamos datos de usuario agregandole id de task actual
        const user = await userService.findOne(uId); // redefinimosa user para tener los datos actualizados en user
        return user;
      }



      if(user.currentTaskId){  //evaluamos si usuario tiene asociado una tarea actual
        const task = await taskService.findOne(user.currentTaskId); //obtenemos task y vemos si ya esta asociada a un pomodoro
        if(task.pomodoro){ //si tiene pomodoro creado otra tarea y asociamos su id al user
          user = await createTaskToPomodoro(userId);
          await task.update({done:true});
          await this.update(task.pomodoro.id, { run: false });
        };
      } else { // si el usuario actualmente no tiene seleccionado una tarea debemos crear
        user = await createTaskToPomodoro(userId)
      };

      const data = {
        value: user.config.pomodoro,
        userId: user.id,
        taskId: user.currentTaskId // sería ek

      };

      const newPomodoro = await this.create(data);

      return newPomodoro

  }

};

module.exports = PomodoroService;
