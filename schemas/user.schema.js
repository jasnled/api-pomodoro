const Joi = require("joi");

const id = Joi.number();
const email = Joi.string().email();
const password = Joi.string().min(6).max(33);

const createUserSchema = Joi.object({

    email: email.required(),
    password: password.required()

});

const getUserSchema = Joi.object({

    id:id.required(),

});

const deleteUserSchema = Joi.object({

    id:id.required()

});

module.exports = {
    createUserSchema,
    getUserSchema,
    deleteUserSchema
};