"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user", {
      id: {
        allowNull: false, // 필수 값
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nickname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      picture: {
        defaultValue: "profile.jpeg",
        allowNull: true,
        type: Sequelize.STRING,
      },
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
    await queryInterface.dropTable("user");
  },
};
