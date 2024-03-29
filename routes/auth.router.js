const express = require('express');
const passport = require('passport');
const { validatorHandler } = require('../middleware/validator.handler');
const { loginUserSchema, recoveryPasswordSchema } = require('../schemas/auth.schema');

const AuthService = require('../services/auth.service');

const service = new AuthService();

const router = express.Router();

router.post('/login',
  validatorHandler(loginUserSchema, 'body'),
  passport.authenticate('local', { session: false }),
  async(req, res, next) => {
    try{
      const userReq = req.user;
      const user = {
         id: userReq.id,
         email: userReq.email,
         currentTaskId: userReq.currentTaskId
      };
      const token = service.signToken(user);
      res.status(200).json(token);

    }catch(err){
      next(err);
    }
  }
);

router.post('/recovery',
  async (req, res, next) => {
    // async..await is not allowed in global scope, must use a wrapper
    try {
      const { email } = req.body;
      const rta = await service.sendRecovery(email);
      res.status(200).json(rta);
    } catch (error) {
      next(error);
    }

  }
);

router.post('/change-password',
  async (req, res, next) => {
    try {

      const { token, newPassword } = req.body;
      const rta = await service.changePassword(token, newPassword);
      res.status(200).json(rta);

    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
