const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const CONFIG_TABLE = 'configs';

const ConfigSchema = {
    id: {
    
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER
    
    },

    pomodoro: {

        allowNull: false,
        defaultValue: 25,
        type: DataTypes.INTEGER
    
    },
    longBreak: {

        allowNull:false,
        defaultValue: 10,
        type:DataTypes.INTEGER,
        field: 'long_break'
    
    },
    shortBreak: {
    
        allowNull: false,
        defaultValue: 5,
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
        onDelete: 'SET NULL'

    },
    createdAt: {

        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.Now,
    
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