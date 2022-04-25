"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("diary", "trip_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "trip",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("diary", "trip_id");
  },
};
