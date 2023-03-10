const express = require('express');

const router = express.Router();

router.get('/', 
    async (req, res, next) => {
        try{
            const users = req.body; 
            res.status(201).json("at this moment we're unable");
        }
        catch(error){
            next(error); 
        }
    },
);

router.post('/'

);


module.exports = router;
