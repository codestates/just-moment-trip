"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  trip.init(
    {
      title: DataTypes.STRING,
      country: DataTypes.STRING,
      total_price: DataTypes.INTEGER,
      base_currency: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "trip",
      freezeTableName: true,
    }
  );
  return trip;
};
