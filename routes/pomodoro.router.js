const express = require('express');

const router = express.Router();

router.get('/:id', 
    async (req, res, next) => {
        try {
            const { id } = req.params;

            res.status(200).json({
                id
            })
        } catch (err){
            next(err);
        }
    }
    
);