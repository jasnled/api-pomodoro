const express = require('express');
const passport = require('passport');
const router = express.Router();
const ProfileService = require('../services/profile.services');


const service = new ProfileService();


router.get('/tasks',
  passport.authenticate('jwt', { session:false }),
  async (req, res, next) => {
    try{
      const userId  = req.user.sub;
      const tasks = await service.findTasks(userId);
      res.status(200).json(tasks? tasks : null);
    }catch(err){
      next(err);
    }
  }

);

router.get('/pomodoros',
  passport.authenticate('jwt', {session:false}),
  async (req, res, next) => {
    try{
      const userId  = req.user.sub;
      const pomodoros = await service.findPomodoros(userId);
      res.status(200).json(pomodoros ? pomodoros : null);
    }catch(err){
      next(err);
    }

  }

);

router.get('/config',
  passport.authenticate('jwt', {session:false}),
  async (req, res, next) => {
    try{
      const userId  = req.user.sub;
      const tasks = await pomodoroService.findByUser(userId);
      res.status(200).json(tasks);
    }catch(err){
      next(err);
    }

  }

);

router.delete('/',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      const rta = await service.deleteUser(userId);
      res.status(200).json(rta);
    } catch (error) {
      next(error)
    }

  }
);



module.exports = router;
