"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "user",
      {
        id: {
          allowNull: false, // 필수 값
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        password: {
          allowNull: false,
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
      }
      // {  이것들 되는지 확인하기  모델에 쓰는걸수도  잘 모름
      //   sequelize,
      //   timestamps: true, // createdAt, udaptedAt 자동 생성
      //   underscored: false,
      //    modelName: 'User', // 모델명
      //    tableName: 'users', // 테이블명
      //    paranoid: true, // deletedAt 자동 생성
      //    charset: 'utf8', // 한글 입력 설정
      //    collate: 'utf8_general_ci',
      // }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user");
  },
};
