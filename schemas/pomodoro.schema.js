const Joi = require('joi');

const value = Joi.number();
const timeSpent = Joi.number();
const id = Joi.number();
const run = Joi.bool();

const createPomodoroSchema = Joi.object({

  value: value.required(),

});

const updatePomodoroSchema = Joi.object({

  value,
  timeSpent,
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
