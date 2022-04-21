module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("trip", [
      {
        user_id: userId,
        county: "korea",
        totalPrice: 1000000,
        start_date: 2022 - 01 - 01,
        end_date: 2022 - 01 - 02,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("account", null, {});
  },
};
