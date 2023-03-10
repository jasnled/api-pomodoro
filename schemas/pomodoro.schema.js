const Joi = require('joi');

const value = Joi.number();
const timeSpend = Joi.number();
const userId = Joi.number();
const taskId = Joi.number();
const id = Joi.required();

const createPomodoroSchema = Joi.object({

    value: value.required(),
    timeSpend: timeSpend.required(),
    userId: userId.required(), 
    taskId, 

});

const updatePomodoroSchema = Joi.object({
    
    id: id.required(),
    value,
    timeSpend,
    taskId

});

const deletePomodoroSchema = Joi.object({

    id: id.required()

});

const getPomodoroSchema = Joi.object({

    id: id.required()

});

module.exports = {

    createPomodoroSchema,
    updatePomodoroSchema,
    deletePomodoroSchema,
    getPomodoroSchema
    
}