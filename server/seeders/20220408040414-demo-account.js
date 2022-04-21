module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("account", [
      {
        trip_id: 0,
        category: "음식",
        item_name: "치킨",
        price: 10000,
        paid_person: "만선",
        currency: "KRW",
        picture: "url",
        gps: "22,22",
        write_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("account", null, {});
  },
};
