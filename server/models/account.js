"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  account.init(
    {
      // trip_id: DataTypes.NUMBER,
      category: DataTypes.STRING,
      item_name: DataTypes.STRING,
      price: DataTypes.NUMBER,
      spent_person: DataTypes.STRING,
      target_currency: DataTypes.STRING,
      memo: DataTypes.STRING,
      gps: DataTypes.STRING,
      write_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "account",
      freezeTableName: true,
    }
  );
  return account;
};
