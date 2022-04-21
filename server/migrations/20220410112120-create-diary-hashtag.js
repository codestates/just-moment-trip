"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("diary_hashtag", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // diary_id: {
      //   type: Sequelize.INTEGER,
      // },
      // hashtag_id: {
      //   type: Sequelize.INTEGER,
      // },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("diary_hashtag");
  },
};
