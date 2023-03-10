const express = require('express');

const router = express.Router();

router.get('/:id',
    async (req, res, next) => {
        try{
            const configUser = req.params;
        }catch(error){
            next(error);
        }
    }
);

module.exports = router;
