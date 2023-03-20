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
        userId
      }
    });

    return tasks;
  }

  async findOne(id){
    const task = await models.Task.findByPk(id);

    if(!task){
      throw boom.notFound('task not found');
    }
    return task;
  };

  async update(id, data){

    const task = await this.findOne(id);
    const rta = await task.update(data);
    return rta;
  }

  async delete(id){

    const task = await this.findOne(id);
    const rta = await task.destroy();
    return rta;

  }
};

module.exports = TaskService;

