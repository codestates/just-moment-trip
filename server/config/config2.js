require("dotenv").config();
{
  module.exports = {
    development: {
      username: "root",
      password: "12345678",
      database: "remembertrip_development",
      host: "127.0.0.1",
      dialect: "mysql",
      timezone: "+09:00",
      dialectOptions: {
        charset: "utf8mb4",
        dateStrings: true,
        typeCast: true,
      },
    },
    test: {
      username: "admin",
      password: "12345678",
      database: "remembertrip_test",
      host: "127.0.0.1",
      dialect: "mysql",
      timezone: "+09:00",
      dialectOptions: {
        charset: "utf8mb4",
        dateStrings: true,
        typeCast: true,
      },
    },
    production: {
      username: "admin",
      password: "12345678",
      database: "remembertrip_production",
      host: "127.0.0.1",
      timezone: "+09:00",
      dialectOptions: {
        charset: "utf8mb4",
        dateStrings: true,
        typeCast: true,
      },
    },
  };
}
