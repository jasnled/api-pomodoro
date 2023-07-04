const Joi = require("joi");

const id = Joi.number();
const email = Joi.string().email();
const password = Joi.string().min(6).max(33);
const currentTaskId = Joi.number().allow(null);

const createUserSchema = Joi.object({

    email: email.required(),
    password: password.required()

});

const getUserSchema = Joi.object({

    id:id.required(),

});

const updateUserSchema = Joi.object({
  password,
  currentTaskId
});


module.exports = {
    createUserSchema,
    getUserSchema,
    updateUserSchema
};
