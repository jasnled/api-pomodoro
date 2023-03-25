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
    const pomodoros = await findAll({
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


      const user = await userService.findOne(userId);

      if(!user.currentTaskId){ // si el usuario actualmente no tiene seleccionado una tarea debemos crear
        const newTask = await taskService.create(user.id); // creamos la tarea sin titulo
        await userService.update({currentTaskId: newTask.id}); // actualizamos datos de usuario agregandole id de task actual
        user = await userService.findOne(userId); // redefinimosa user para tener los datos actualizados en user
      };

      const data = {
        value: user.config.pomodoro,
        userId: user.id,
        taskId: user.currentTaskId // sería ek
      };

      const newPomodoro = await service.create(data);

      return newPomodoro

  }

};

module.exports = PomodoroService;
