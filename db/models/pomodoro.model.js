const { Model, DataTypes, Sequelize } = require('sequelize');
const { TASK_TABLE } = require('./task.model');
const { USER_TABLE } = require('./user.model');

const POMODORO_TABLE = 'pomodoros';

const PomodoroSchema = {
    id: {

        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER

    },
    value: {

        allowNull: false,
        type: DataTypes.INTEGER

    },
    timeSpent:{

        field: 'time_spent',
        defaultValue: 0,
        type:DataTypes.INTEGER,
        allowNull: false,

    },
    run:{
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN,
    },
    userId: {

        allowNull:false,
        field: 'user_id',
        type: DataTypes.INTEGER,
        reference: {
            model: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'

    },

    taskId: {

        allowNull:true,
        field: 'task_id',
        type: DataTypes.INTEGER,
        references: {
            model: TASK_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        unique: true

    },

    createdAt: {

        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW

    }
}

class Pomodoro extends Model{
    static associate(models) {
        this.belongsTo(models.User,{
            as: 'user'
        });
        this.belongsTo(models.Task, {
            as:'task'
        })
    }
    static config(sequelize){
        return {

            sequelize,
            tableName: POMODORO_TABLE,
            modelName: 'Pomodoro',
            timestamps: false

        }
    }
}


module.exports = { Pomodoro, POMODORO_TABLE, PomodoroSchema }
