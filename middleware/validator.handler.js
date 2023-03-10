const validatorHandler = (schema, property) => {
    return (req, res, next) => {
        
        const data = req[property];
        console.log(`en el validator handler user: ${req.body}`)
        const { error } = schema.validate(data, {abortEarly: false});
        if (error){
            next(boom.badRequest());
        }
        next();
    }

}

module.exports = { validatorHandler };