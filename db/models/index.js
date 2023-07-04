const { User, UserSchema } = require('./user.model');
const { Task, TaskSchema } = require('./task.model');
const { Pomodoro, PomodoroSchema } = require('./pomodoro.model');
const { Config, ConfigSchema } = require('./config.model');

function setupModels(sequelize){

    User.init(UserSchema, User.config(sequelize));
    Task.init(TaskSchema, Task.config(sequelize));
    Pomodoro.init(PomodoroSchema, Pomodoro.config(sequelize));
    Config.init(ConfigSchema, Config.config(sequelize));


    User.associate(sequelize.models);
    Task.associate(sequelize.models);
    Pomodoro.associate(sequelize.models);
    Config.associate(sequelize.models);

}

module.exports = setupModels;
