const { Model, DataTypes, Sequelize} = require('sequelize');

const { POMODORO_TABLE } = require('./pomodoro.model');
const { TASK_TABLE } = require('./task.model');
const { USER_TABLE } = require('./user.model');


const STATE_TABLE = 'states';



const StateSchema = {
    id: {

        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER

    },
    userId: {

        allowNull:false,
        field: 'user_id',
        type: DataTypes.INTEGER,
        reference: {
            model: USER_TABLE,
            key: id
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'

    },
    pomodoroId: {
        allowNull: true,
        field: 'pomodoro_id',
        type: DataTypes.INTEGER,
        reference: {
            model: POMODORO_TABLE,
            key: id
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    taskId: {
        allowNull: true,
        field: 'task_id',
        type: DataTypes.INTEGER,
        reference: {
            model: TASK_TABLE,
            key: id
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
};

class State extends Model {
    static associate(models){
        this.belongsTo(models.Pomodoro,{
            as: 'pomodoro'
        });

        this.belongsTo(models.User,{
            as: 'user'
        });

        this.belongsTo(models.Task, {
            as: 'task'
        });
    };

    static config(sequelize){
        return {
            sequelize,
            tableName: STATE_TABLE,
            modelName: 'State',
            timestamps: false
        }
    }
};

module.exports = { State, STATE_TABLE, StateSchema };