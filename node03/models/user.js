'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Role, {
        foreignKey: "user_id",
        through: "user_role",
        as: "roles",
      });
      User.belongsToMany(models.Permission, {
        foreignKey: "user_id",
        through: "users_permissions",
        as: "permissions",
      });
      User.hasOne(models.Phone, {
        foreignKey: "user_id",
        as: "phone",
      });

      // User.hasOne(models.Role, {
      //   foreignKey: "user_id",
      //   as: "phone",
      // });
      // User.hasMany(models.Post, {
      //   foreignKey: "user_id",
      //   as: "posts",
      // });
      // User.belongsToMany(models.Course, {
      //   foreignKey: "user_id",
      //   through: "users_courses",
      //   as: "courses",
      // });
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING(30),
    email: DataTypes.STRING(100),
    password: DataTypes.STRING(100),
    status: DataTypes.BOOLEAN,
    refresh_token: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users', //name table in database
    createdAt: 'created_at',
    updatedAt: "updated_at",
  });
  return User;
};