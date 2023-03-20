const express = require('express');
const passport = require('passport');
const { validatorHandler } = require('../middleware/validator.handler');
const { loginUserSchema } = require('../schemas/auth.schema');

const AuthService = require('../services/auth.service');

const service = new AuthService();

const router = express.Router();

router.post('/login',
  validatorHandler(loginUserSchema, 'body'),
  passport.authenticate('local', { session: false }),
  async(req, res, next) => {
    try{

      const user = req.user;
      const token = service.signToken(user);
      res.status(200).json(token);

    }catch(err){
      next(err);
    }
  }
);

