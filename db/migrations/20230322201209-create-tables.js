'use strict';

const { CONFIG_TABLE, ConfigSchema } = require('../models/config.model');
const { POMODORO_TABLE, PomodoroSchema } = require('../models/pomodoro.model');
const { TASK_TABLE, TaskSchema } = require('../models/task.model');
const { USER_TABLE, UserSchema } = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CONFIG_TABLE, ConfigSchema);
    await queryInterface.createTable(TASK_TABLE, TaskSchema);
    await queryInterface.createTable(POMODORO_TABLE, PomodoroSchema);

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable(POMODORO_TABLE);
    await queryInterface.dropTable(CONFIG_TABLE);
    await queryInterface.dropTable(TASK_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  }

};
