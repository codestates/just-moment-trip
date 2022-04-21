"use strict";

const { sequelize } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("account", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // trip_id: {
      //   type: Sequelize.INTEGER,
      // },
      category: {
        type: Sequelize.STRING,
      },
      item_name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      paid_person: {
        type: Sequelize.STRING,
      },
      currency: {
        type: Sequelize.STRING,
      },
      picture: {
        type: Sequelize.STRING,
      },
      gps: {
        type: Sequelize.STRING,
      },
      write_date: {
        type: Sequelize.DATE,
        defaultValue: sequelize.fn("now"),
      },
      createdAt: {
        allowNull: false,
        defaultValue: sequelize.fn("now"),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: sequelize.fn("now"),
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("account");
  },
};
