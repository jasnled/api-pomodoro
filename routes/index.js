const express = require('express');

const usersRouter = require('./user.router');
const pomodorosRouter = require('./pomodoro.router');
const taskRouter = require('./task.router');
const configRouter = require('./config.router');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');

function routerApi(app){

    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/users', usersRouter);
    router.use('/pomodoros', pomodorosRouter);
    router.use('/tasks', taskRouter);
    router.use('/config', configRouter);
    router.use('/auth', authRouter);
    router.use('/profile', profileRouter);

};

module.exports = routerApi;
