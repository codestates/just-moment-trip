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
      // models.trip.belongsTo(models.user, { foreignKey: "user_id" });
      // this.belongsTo(models.user);
    }
  }
  trip.init(
    {
      // user_id: DataTypes.INTEGER,
      country: DataTypes.STRING,
      totalPrice: DataTypes.INTEGER,
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
