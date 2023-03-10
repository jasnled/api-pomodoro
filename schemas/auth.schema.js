Joi = require('joi');

const email = Joi.string().min(3).max(33);
const password = Joi.string().min(6).max(33);

const loginUserSchema = Joi.object({

    email: email.required(),
    password: password.required()

});






module.exports = { loginUserSchema }