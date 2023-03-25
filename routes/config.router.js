const express = require('express');
const passport = require('passport');
const { validatorHandler } = require('../middleware/validator.handler');
const { createConfigSchema, updateConfigSchema, getConfigSchema } = require('../schemas/config.schema');
const ConfigService = require('../services/config.service');

const service = new ConfigService();
const router = express.Router();

router.get('/',
  passport.authenticate('jwt', {session:false}),
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      const config = await service.findOneByUserId(userId);
      res.status(200).json(config);
    } catch (error) {
      next(error)
    }
  }
);

router.patch('/',
  passport.authenticate('jwt',{ session: false })),
  validatorHandler(updateConfigSchema, 'body'),
  async (req, res, next) => {
    try {
      const userId =  req.user.sub;
      const config = await service.findOneByUserId(userId);
      const data = req.body;
      const rta = await config.update(data);
      res.status(200).json(rta);

    } catch (error) {
      next(error)
    }
  }


module.exports = router;
