const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class ConfigService {
  constructor(){}

  async create(userId){

    const newConfig = await models.Config.create(userId);
    return newConfig;

  };

  async findOne(id){
    const config = await models.Config.findByPk(id);
    if(!config){
      throw boom.notFound('config not found');
    }
    return config
  }

  async findOneByUserId(userId){
    const config = await models.Config.findOne({
      where:{ userId }
    });
    if(!config){
      throw boom.notFound('config not found');
    };
    return config;
  }

  async update(id, data){

    const config = await this.findOne(id);
    const rta = await config.update(data);
    return rta;

  }

};


module.exports = ConfigService;
