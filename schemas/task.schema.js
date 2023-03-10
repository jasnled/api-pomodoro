const Joi = require('Joi');

const id = Joi.number();
const taskName = Joi.string();
const userId = Joi.number();

const createTaskSchema = Joi.object({
    
    taskName: taskName.required(),
    userId: userId.required()

});

const updateTaskSchema = Joi.object({

    taskName

});

const deleteTaskSchema = Joi.object({

    id: id.required()

});

module.exports = {
    createTaskSchema,
    updateTaskSchema,
    deleteTaskSchema
}