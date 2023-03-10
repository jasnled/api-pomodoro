const express = require('express');

const usersRouter = require('./user.router');
const pomodorosRouter = require('./pomodoros.router');
const taskRouter = require('./task.router');
const configRouter = require('./config.router');
const stateRouter = require('./state.router');
const authRouter = require('./auth.router');

function routerApi(app){
 
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/users', usersRouter);
    router.use('/pomodoros', pomodorosRouter);
    router.use('/task', taskRouter);
    router.use('/config', configRouter);
    router.use('/state', stateRouter );
    router.use('/auth', authRouter);

};

module.exports = routerApi;
