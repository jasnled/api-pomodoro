const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const UserService = require('../services/user.service');
const userService = new UserService();
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const nodemailer = require('nodemailer');
class AuthService {

  signToken(user){
    const payload = {
        sub:user.id
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return { user, token };
  };

  async getUser(email){
    const user = await userService.findByEmail(email);
    return user;
  };

  comparePassword(password, hash){
    const isMatch = bcrypt.compare(password, hash);
    return isMatch;
  };

  async sendEmail(email, link){

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.userMailer, // crear en env la variable de entorno
        pass: config.passMailer  // crear en enl a
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: config.userMailer, // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      subject: "recovery password ✔", // Subject line
      html: `<b>Please access the link to change password => ${link}</b>` // html body
    });
    return { message: 'mail sent' }
  };

  async changePassword(token, newPassword){
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await userService.findOne(payload.sub);
      if(user.recoveryToken !== token){
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await userService.update(user.id, {recoveryToken: null, password: hash});
      return { message: 'password changed'};
    } catch (error) {
      throw boom.unauthorized();
    }
  };

  async sendRecovery(email){
    const user = await userService.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    };
    const payload = {
      sub: user.id,  // para generar el token con el id del user
    };
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const  link = `http://localhost:3000/change-password?token=${token}`;
    await userService.update(user.id, {recoveryToken: token});
    const rta = await this.sendEmail(email, link);
    return rta;
  };




}

module.exports = AuthService;
