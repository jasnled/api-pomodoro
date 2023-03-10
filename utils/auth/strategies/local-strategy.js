const { Strategy } = require('passport-local');

const LocalStrategy = new Strategy({
    usernameField:'email',
    passwordField:'password'
    },
    (email, password, done)=>{
    try{
        const user = {
            email,
            password
        }
        done(null, user);
    }catch(error){
        done(error)

    }
});

module.exports = LocalStrategy;