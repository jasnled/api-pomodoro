const boom = require('@hapi/boom');
const { Strategy } = require('passport-local');
const AuthService = require('../../../services/auth.service');
const authService = new AuthService();

const LocalStrategy = new Strategy({
    usernameField:'email',
    passwordField:'password'
    },
    async (email, password, done)=>{
    try{
        const user = await authService.getUser(email);
        const isMatch = await authService.comparePassword(password, user.password);
        if(!isMatch){
          throw boom.unauthorized();
        };
        done(null, user);
    }catch(error){
        done(error)

    }
});

module.exports = LocalStrategy;
