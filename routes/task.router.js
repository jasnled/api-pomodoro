const { validatorHandler } = require('../middleware/validator.handler');

const { createTaskSchema, updateTaskSchema, deleteTaskSchema, getTaskSchema } = require('../schemas/task.schema');

const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/:id',
  validatorHandler(getTaskSchema, 'params'),
  async(req, res, next) => {
    try{

      res.status(201).json(task ? task : null);

    }
    catch(error){

      next(error);

    }
  }
);

router.post('/',
  validatorHandler(createTaskSchema, 'body'),
  passport.authenticate()

);



module.exports = router;
