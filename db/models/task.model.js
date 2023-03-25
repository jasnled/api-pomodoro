const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const TASK_TABLE = 'tasks';

const TaskSchema = {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  taskName: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'no title'
  },

  userId: {
      allowNull:false,
      field: 'user_id',
      type: DataTypes.INTEGER,
      refences: {
          model:USER_TABLE,
          key: 'id',
      },
      onUpdate:'CASCADE',
      onDelete: 'SET NULL'
  },
  createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: Sequelize.Now
  },

};

class Task extends Model {
    static associate(models){
        this.belongsTo(models.User,{
            as: 'user'
        })
        this.hasOne(models.Pomodoro, {
            as: 'pomodoro',
            foreignKey: 'taskId'
        })
    }
    static config(sequelize){
        return{
            sequelize,
            tableName: TASK_TABLE,
            modelName: 'Task',
            timestamps:false
        }
    }
}

module.exports = { Task, TASK_TABLE, TaskSchema };
