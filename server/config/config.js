require("dotenv").config();
{
  module.exports = {
    development: {
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: "JMT_development",
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      dialect: "mysql",
      timezone: "+09:00",
      dialectOptions: {
        charset: "utf8mb4",
        dateStrings: true,
        typeCast: true,
      },
    },
    test: {
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: "JMT_test",
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      dialect: "mysql",
      timezone: "+09:00",
      dialectOptions: {
        charset: "utf8mb4",
        dateStrings: true,
        typeCast: true,
      },
    },
    production: {
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: "JMT_production",
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      dialect: "mysql",
      timezone: "+09:00",
      dialectOptions: {
        charset: "utf8mb4",
        dateStrings: true,
        typeCast: true,
      },
    },
  };
}
//!
// require("dotenv").config();
// {
//   module.exports = {
//     development: {
//       username: "admin",
//       password: process.env.DATABASE_PASSWORD,
//       database: "remembertrip_development",
//       host: "remember-trip-side.coe5erwjzpjy.ap-northeast-2.rds.amazonaws.com",
//       port: 13306,
//       dialect: "mysql",
//       timezone: "+09:00",
//       dialectOptions: {
//         charset: "utf8mb4",
//         dateStrings: true,
//         typeCast: true,
//       },
//     },
//     test: {
//       username: "admin",
//       password: "12345678",
//       database: "remembertrip_test",
//       host: "127.0.0.1",
//       dialect: "mysql",
//       timezone: "+09:00",
//       dialectOptions: {
//         charset: "utf8mb4",
//         dateStrings: true,
//         typeCast: true,
//       },
//     },
//     production: {
//       username: "admin",
//       password: "12345678",
//       database: "remembertrip_production",
//       host: "127.0.0.1",
//       timezone: "+09:00",
//       dialectOptions: {
//         charset: "utf8mb4",
//         dateStrings: true,
//         typeCast: true,
//       },
//     },
//   };
// }
