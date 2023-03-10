const Joi = require('joi');

const pomodoro = Joi.number().min(1).max(600);
const shortBreak = Joi.number().min(1).max(600);
const longBreak = Joi.number().min(1).max(600);
const userId = Joi.number();

const createConfigSchema = object({
    userId: userId.required(),
});

const updateConfigSchema = object({
    
    pomodoro,
    shortBreak,
    longBreak

});

const getConfigSchema = object({

    userId: userId.required()

});

module.exports = {
    createConfigSchema,
    updateConfigSchema,
    getConfigSchema
};