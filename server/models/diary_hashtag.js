"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class diary_hashtag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  diary_hashtag.init(
    {
      diary_id: DataTypes.INTEGER,
      hashtag_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "diary_hashtag",
      freezeTableName: true,
    }
  );
  return diary_hashtag;
};
