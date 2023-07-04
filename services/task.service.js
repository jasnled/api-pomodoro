const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');


class TaskService {

  async create(data){
    const newTask = await models.Task.create(data);
    return newTask;
  };

  async findByUser(userId){
    const tasks = await models.Task.findAll({
      where:{
        userId,
      },
      include:['pomodoro']
    });

    return tasks;
  };

  async deleteTasksDone(userId){
    const tasksDone = await models.Task.findAll({
      where:{
        userId,
        done: true
      },
    });
    tasksDone.map(async taskDone => {
     const rta = await taskDone.destroy();
    });
    return {mesagge: "Deleted"};

  }

  async findOne(id){
    const task = await models.Task.findByPk(id, {
      include:['pomodoro']
    });

    if(!task){
      throw boom.notFound('task not found');
    }
    return task;
  };

  async update(id, data){

    const task = await this.findOne(id);
    const rta = await task.update(data);
    return rta;

  };

  async delete(id){

    const task = await this.findOne(id,{
      include:['pomodoro']
    });
    const rta = await task.destroy();

    return rta;

  };
};

module.exports = TaskService;

