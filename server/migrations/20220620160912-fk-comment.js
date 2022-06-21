"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("comment", "post_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "post",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.addColumn("comment", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "user",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("comment", "post_id");
    await queryInterface.removeColumn("comment", "user_id");
  },
};
