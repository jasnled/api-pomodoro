const express = require('express');

const router = express.Router();

router.get('/:id', 
    async (req, res, next) => {
        try {
            const pomodoro = req.params;

            res.status(200).json({
                id: req.params.id
            })
        } catch (err){

        }
    }
    
);