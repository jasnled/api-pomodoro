const Joi = require('joi');

const pomodoro = Joi.number().min(1).max(6000);
const shortBreak = Joi.number().min(1).max(6000);
const longBreak = Joi.number().min(1).max(6000);
const userId = Joi.number();

const createConfigSchema = Joi.object({
    userId: userId.required(),
});

const updateConfigSchema = Joi.object({

    pomodoro,
    shortBreak,
    longBreak

});

const getConfigSchema = Joi.object({

    userId: userId.required()

});

module.exports = {
    createConfigSchema,
    updateConfigSchema,
    getConfigSchema
};
