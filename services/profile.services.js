const TaskService = require('../services/task.service');
const PomodoroService = require('../services/pomodoro.service');
const ConfigService = require('../services/config.service');
const UserService = require('../services/user.service');

const taskService = new TaskService();
const pomodoroService = new PomodoroService();
const configService = new ConfigService();
const userService = new UserService();

class ProfileService {

  async findTasks(userId){
    const tasks = await taskService.findByUser(userId);
    return tasks;
  };

  async findPomodoros(userId){
    const pomodoros = await pomodoroService.findByUser(userId);
    return pomodoros;
  };

  async findConfig(userId){
    const config = await configService.findOneByUserId(userId);
    return config;
  };

  async deleteUser(userId){

    const pomodoros = await this.findPomodoros(userId);
    if(pomodoros){
      pomodoros.map(async pomodoro => {

        await pomodoro.destroy();

      });
    };

    const tasks = await this.findTasks(userId);
    if(tasks){
      tasks.map(async task => {

        await task.destroy();

      });
    };

    const config = await this.findConfig(userId);
    await config.destroy();

    const user = await userService.findOne(userId);
    const rta = await user.destroy();


    return rta;
  }


}


module.exports = ProfileService;
