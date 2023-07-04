const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const CONFIG_TABLE = 'configs';

const ConfigSchema = {
    id: {

        allowNull: false,
        autoIncrement: true,
        primaryKey:true,
        type: DataTypes.INTEGER

    },

    pomodoro: {

        allowNull: false,
        defaultValue: 25*60,
        type: DataTypes.INTEGER

    },
    longBreak: {

        allowNull:false,
        defaultValue: 10*60,
        type:DataTypes.INTEGER,
        field: 'long_break'

    },
    shortBreak: {

        allowNull: false,
        defaultValue: 5*60,
        type: DataTypes.INTEGER,
        field: 'short_break'

    },
    userId: {

        allowNull: false,
        field: 'user_id',
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: DataTypes.INTEGER
    },
    createdAt: {

        allowNull: false,
        field: 'created_at',
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,

    }
};

class Config extends Model{
    static associate(models){
        this.belongsTo(models.User, {
            as: 'user',
        })
    }
    static config(sequelize){
        return {
            sequelize,
            tableName: CONFIG_TABLE,
            modelName: 'Config',
            timestamps: false
        };
    }
};

module.exports = { Config, CONFIG_TABLE, ConfigSchema }
