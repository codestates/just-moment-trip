module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("user", [
      {
        user_id: "admin",
        password: 1234,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: "sub",
        password: 4321,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user", null, {});
  },
};
