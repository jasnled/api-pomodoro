const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class UserService {
  constructor(){}

  async create(data){

    const hash = await bcrypt.hash(data.password, 10);
    data.password = hash;
    console.log(`este el hash${hash}`);
    const newUser = await models.User.create(data);
    delete newUser.dataValues.password;
    return newUser;

  };

  async findByEmail(email){
    const user = await models.User.findOne({
      where:{
        email
      }
    });
    if(!user){
      throw boom.unauthorized();
    }
    return user;
  };

  async findOne(id){
    const user = await models.User.findByPk(id, {
      include: ['config']
    });//traer relaciones
    if(!user){
      throw boom.notFound('user not found');
    }
    return user;
  };

  async update(id, data){

    const user = await this.findOne(id);
    const rta = await user.update(data);
    return rta;

  };

  async delete(id){

    const user = await this.findOne(id);
    const rta = await user.destroy();
    return rta;

  };

};

module.exports = UserService;
