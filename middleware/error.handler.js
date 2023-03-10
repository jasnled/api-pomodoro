const { ValidationError } = require('sequelize');

function logError(err, req, res, next){

    console.log(err);

    next(err);
};

function errorHandler(err, req, res, next){

    res.status(500).json({
        message: err.message,
        stack: err.stack
    });

    next(err);
};

function ormErrorHandler(err, req, res, next){

    if(err instanceof ValidationError){

        res.status(409).json({
            status: 409,
            message: err.name,
            errors: err.errors
        });

    };  
    
    next(err);  
};

function boomErrorHandler(err, req, res, next){
    if(err.isBoom){
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    };
    next(err);
}

module.exports = { logError, boomErrorHandler, errorHandler, ormErrorHandler }