const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

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

  async find(userId){
    const pomodoros = await findAll({
      where: { userId }
    });
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
  }

};

module.exports = PomodoroService;
