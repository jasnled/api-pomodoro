const Joi = require('Joi');

const id = Joi.number();
const taskName = Joi.string();
const userId = Joi.number();

const createTaskSchema = Joi.object({

    taskName: taskName.required(),

});

const updateTaskSchema = Joi.object({

    taskName

});

const getTaskSchema =Joi.object({
  id: id.require()
});


const deleteTaskSchema = Joi.object({

    id: id.required()

});

module.exports = {
    createTaskSchema,
    updateTaskSchema,
    deleteTaskSchema,
    getTaskSchema
}
