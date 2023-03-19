const passport = require('passport');

const LocalStrategy = require('./strategies/local-strategy');
const JwtStrategy = require('./strategies/local-strategy');

passport.use(LocalStrategy);
passport.use(JwtStrategy);

