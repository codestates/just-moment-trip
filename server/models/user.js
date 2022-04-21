"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.user.hasMany(models.trip, { foreignKey: "user_id" });
      // this.hasMany(models.trip);
    }
  }
  user.init(
    {
      user_id: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
      freezeTableName: true,
      timestamps: true, //기본이 true
    }
  );
  return user;
};
