"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("post", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "user",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.addColumn("post", "trip_id", {
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

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("post", "tripId");
    await queryInterface.removeColumn("post", "user_id");
  },
};
