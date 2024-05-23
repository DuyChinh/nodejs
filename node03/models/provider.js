"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Provider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasOne(models.Phone, {
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
  Provider.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING(30),
    },
    {
      sequelize,
      modelName: "Provider",
      tableName: "providers", //name table in database
      createdAt: "created_at",
      updatedAt: "updated_at",
      // deletedAt: "deleted_at",
      // paranoid: true,

      // timestamps: false;
      //remove time
    }
  );
  return Provider;
};
