const Joi = require('joi');
const express = require('express');
const boom = require('@hapi/boom');
const app = express();
const router = express.Router();
const usersRouter = express.Router();
const { config } = require('./config/config');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const cors = require('cors');
const routerApi = require('./routes');
const { logError, boomErrorHandler, errorHandler, ormErrorHandler } = require('./middleware/error.handler');


const email = Joi.string().min(2).max(33);
const password = Joi.string().min(6).max(33);

// cors 

const whitelist = ['http://127.0.0.1:5500','http://localhost:5500', 'http://localhost:8080'];
const options = {
    origin: (origin, callback) => {
        if(whitelist.includes(origin) || !origin){
            callback(null, true);
        }else{
            
            callback(boom.unauthorized());
        }
    }
}



app.use(cors(options));
 
// errors handle
app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);
app.use(ormErrorHandler);

//

app.use(express.json());


const loginUserSchema = Joi.object({
    email: email.required(),
    password: password.required()
});

function signToken(user){
    const payload = {
        sub:user.email
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return { user, token };
}



routerApi(app);

require('./utils/auth/index'); 


router.use('/users',usersRouter);



usersRouter.get('/',
    (req,res,next)=>{
        const data = req.body;
        res.json({message:`hola ${data.email} ${data.password}`});
    }
);

usersRouter.post('/auth/login',
    validatorHandler(loginUserSchema, 'body'),
    passport.authenticate('local', { session: false }),
    async (req,res,next) => {
        try{
            
            const user = req.user;
            const token = signToken(user);
            res.status(201).json(token);
        }catch(err){
            next(err);
        }
        
    }
)


app.listen(config.port, ()=>{
    console.log(`listen to port: ${config.port}`);
});

