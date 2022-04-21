"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Class Table
    // 🎈 클래스 테이블에 teacherId 필드를 생성합니다.
    await queryInterface.addColumn("diary", "trip_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "trip", // trips 모델에서
        key: "id", // 그 아이디 값을 참고합니다.
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    // 🎈 클래스 테이블에 regionId 필드를 생성합니다.
  },

  down: async (queryInterface, Sequelize) => {
    // 🎈 위에서 생성한 필드를 제거합니다.
    await queryInterface.removeColumn(
      "diary", // name of Source model
      "trip_id" // key we want to remove
    );
  },
};
