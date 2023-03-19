const express = require('express');
const { validatorHandler } = require('../middleware/validator.handler');
const { createUserSchema, getUserSchema, updateUserSchema } = require('../schemas/user.schema');
const UserService = require('../services/user.service');
const router = express.Router();
const service = new UserService();


router.post('/',
  validatorHandler( createUserSchema, 'body' ),
  async (req, res, next) => {
      try{
          const data = req.body;
          const newUser = await service.create(data);
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
  validator(getUserSchema, 'params'),
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
