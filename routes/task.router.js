const express = require('express');

const router = express.Router();

router.get('/',
    async(req, res, next) => {
        try{
        
            const task = req.body;
            res.status(201).json(task ? task : null);
        
        }
        catch(error){
        
            next(error);
        
        }
    }
);

module.exports = router;