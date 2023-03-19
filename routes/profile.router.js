const express = require('express');
const passport = require('passport');
const TaskService = require('../services/task.service');

const router = express.Router();
const taskService = new TaskService();

router.get('/tasks',
  passport.authenticate('jwt', { session:false }),
  async (req, res, next) => {
    try{
      const{ id } = req.user;
      const tasks = await taskService.findByUser(id);
      res.status(200).json(tasks);
    }catch(err){
      next(err);
    }
  }

);

router.get('/config',
  passport.authenticate('jwt', {session:false}),

);
