const Joi = require('joi');

const value = Joi.number();
const timeSpend = Joi.number();
const userId = Joi.number();
const taskId = Joi.number();
const id = Joi.number();
const run = Joi.bool();

const createPomodoroSchema = Joi.object({

  value: value.required(),

});

const updatePomodoroSchema = Joi.object({

  value,
  timeSpend,
  run

});

const getPomodoroSchema = Joi.object({

  id: id.required()

});

module.exports = {

  createPomodoroSchema,
  updatePomodoroSchema,
  getPomodoroSchema

};
