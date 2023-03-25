const express = require('express');
const { validatorHandler } = require('../middleware/validator.handler');
const { createUserSchema, getUserSchema, updateUserSchema } = require('../schemas/user.schema');
const UserService = require('../services/user.service');
const ConfigService = require('../services/config.service');

const service = new UserService();
const configService = new ConfigService();

const router = express.Router();



router.post('/',
  validatorHandler( createUserSchema, 'body' ),
  async (req, res, next) => {
      try{
          const data = req.body;
          const newUser = await service.create(data);
          console.log(`el nuevo usuario es: ${newUser}`);
          const userId = newUser.id;
          const rta  = await configService.create({userId}); //para crear la configuracion por defecto del usuario
          res.status(201).json(newUser);
      }
      catch(error){
          next(error);
      }
  },
);

router.get('/:id',
  validatorHandler( getUserSchema, 'params' ),
  async ( req, res, next ) => {
    try{
      const { id } = req.params;
      const user = await service.findOne(id);
      res.status(201).json(user);
    }catch(err){
      next(err);
    }
  }
);

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req,res,next) => {
    try {

      const { id } = req.params;
      const data = req.body;
      const rta = await service.update(id, data)
      res.status(200).json(rta);

    }catch(err){
      next(err);
    }
  }
);

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next)=>{
    try{
      const { id } = req.params;
      const rta = await service.delete(id);
      res.status(200).json(rta);
    }catch(err){
      next(err);
    }
  }
);


module.exports = router;
