const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const UserService = require('../services/user.service');
const userService = new UserService();
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

class AuthService {

  signToken(user){
    const payload = {
        sub:user.email
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return { user, token };
  };

  async getUser(email){
    const user = await userService.findByEmail(email);
    return user;
  }

  comparePassword(password, hash){
    const isMatch = bcrypt.compare(password, hash);
    return isMatch;
  }


}

module.exports = AuthService;
