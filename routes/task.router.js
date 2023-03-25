const { validatorHandler } = require('../middleware/validator.handler');
const { createTaskSchema, updateTaskSchema, getTaskSchema } = require('../schemas/task.schema');

const TaskService = require('../services/task.service');

const express = require('express');
const passport = require('passport');

const router = express.Router();
const service = new TaskService;

router.get('/:id',
  validatorHandler(getTaskSchema, 'params'),
  async(req, res, next) => {
    try{

      const { id } = req.params;
      const task = await service.findOne(id);
      res.status(201).json(task ? task : null);

    }
    catch(error){

      next(error);

    }
  }
);

router.post('/',
  validatorHandler(createTaskSchema, 'body'),
  passport.authenticate('jwt', { session:false }),
  async (req, res, next) => {
    try{
      var data = req.body;
      const user = req.user;
      data = {
        ...data,
        userId: user.sub
      }
      const rta = await service.create(data);
      res.status(200).json(rta);
    }
    catch(err){
      next(err);
    }
  }

);


router.get('/',
  passport.authenticate('jwt', {session: false}),
  async (req,res,next) => {
    try{
      const user = req.user;
      const tasks = await service.findByUser(user.sub);
      res.status(200).json(tasks ? tasks : null);
    }
    catch(err){
      next(err);
    }

  }
);

router.patch('/:id',
  validatorHandler(getTaskSchema, 'params'),
  validatorHandler(updateTaskSchema, 'body'),
  async (req, res, next) => {

    try{

      const { id } = req.params;
      const data = req.body;
      const rta = await service.update(id, data);
      res.status(200).json(rta);

    }
    catch(err){
      next(err);
    }
  }
);

router.delete('/:id',
  validatorHandler(getTaskSchema, 'params'),
  async (req, res, next) => {
    try {

      const { id } = req.params;
      const rta = service.delete(id);
      res.status(200).json(rta);

    } catch (err) {
      next(err);
    }
  }
);


module.exports = router;
