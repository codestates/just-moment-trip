"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("diary_hashtag", "diary_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "diary",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.addColumn("diary_hashtag", "hashtag_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "hashtag",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("diary_hashtag", "diary_id");
    await queryInterface.removeColumn("diary_hashtag", "hashtag_id");
  },
};
