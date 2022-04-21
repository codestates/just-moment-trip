"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class diary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  diary.init(
    {
      // trip_id: DataTypes.INTEGER,
      location: DataTypes.STRING,
      content: DataTypes.STRING,
      write_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "diary",
      freezeTableName: true,
    }
  );
  return diary;
};
