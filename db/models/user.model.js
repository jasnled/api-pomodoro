const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    recoveryToken: {
      field:'recovery_token',
      allowNull: true,
      type: DataTypes.STRING
    },
    currentTaskId: {
        allowNull: true,
        type: DataTypes.INTEGER
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    },
};

class User extends Model {
    static associate(models) {
        this.hasOne(models.Config, {
            as: 'config',
            foreignKey: 'userId'
        });
        this.hasMany(models.Pomodoro,{
            as: 'pomodoros',
            foreignKey: 'userId'
        });
        this.hasMany(models.Task,{
            as:'tasks',
            foreignKey: 'userId'
        });
    }
    static config(sequelize){
        return {
                sequelize,
                tableName: USER_TABLE,
                modelName: 'User',
                timestamps: false
            }

    }

}

module.exports = { User, USER_TABLE, UserSchema };
