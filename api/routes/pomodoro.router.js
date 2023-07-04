const express = require('express');
const passport = require('passport');
const { validatorHandler } = require('../middleware/validator.handler');

const router = express.Router();
const { createPomodoroSchema, updatePomodoroSchema, getPomodoroSchema } = require('../schemas/pomodoro.schema');
const PomodoroService = require('../services/pomodoro.service');

const service = new PomodoroService();


router.get('/:id',
  validatorHandler(getPomodoroSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const pomodoro = await service.findOne(id);
            res.status(200).json(pomodoro);

        } catch (err){
            next(err);
        }
    }
);

router.post('/',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(createPomodoroSchema, 'body'),
  async (req, res, next)=>{
    try{
      const body = req.body;
      const userId = req.user.sub;
      const newPomodoro = await service.createByUser(userId, body);
      res.status(200).json(newPomodoro);

    }catch(err){
      next(err);
    }
  }

);

router.get('/',
  passport.authenticate('jwt', {session: false}),
  async (req,res, next) => {
    try{
      const userId = req.user.sub;
      const pomodoros = await service.findByUser(userId);
      res.status(200).json(pomodoros ? pomodoros : null);
    }catch(err){
      next(err);
    }

  }
)

router.patch('/:id',
  validatorHandler(getPomodoroSchema, 'params'),
  validatorHandler(updatePomodoroSchema, 'body'),
  async (req, res, next) => {
    try{
      const { id } = req.params;
      const data = req.body;
      const rta = await service.update(id, data);
      res.status(200).json(rta);
    }catch(err){
      next(err)
    }

  }

);

router.delete('/:id',
  validatorHandler(getPomodoroSchema, 'params'),
  async (req,res,next) => {
    try{
      const { id } = req.params;
      const rta = await service.delete(id);
      res.status(200).json(rta);
    }catch(err){
      next(err);
    }
  }
)

module.exports = router;
