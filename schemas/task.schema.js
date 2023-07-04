const Joi = require('joi');

const id = Joi.number();
const taskName = Joi.string();
const done = Joi.bool();

const createTaskSchema = Joi.object({

  taskName: taskName,

});

const updateTaskSchema = Joi.object({

  taskName,
  done

});

const getTaskSchema =Joi.object({
  id: id.required()
});




module.exports = {
    createTaskSchema,
    updateTaskSchema,
    getTaskSchema
}
