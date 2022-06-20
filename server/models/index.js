"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
  // host: "remember-trip-side.coe5erwjzpjy.ap-northeast-2.rds.amazonaws.com",
  // port: 13306,
  // logging: console.log,
  // dialect: "mysql",
  // ssl: "Amazon RDS",
  // pool: { maxConnections: 5, maxIdleTime: 30 },
  // language: "en",
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.user.hasMany(db.trip, { foreignKey: "user_id", sourceKey: "id" });
db.trip.belongsTo(db.user, { foreignKey: "user_id", targetKey: "id" });

db.trip.hasMany(db.account, { foreignKey: "trip_id", sourceKey: "id" });
db.account.belongsTo(db.trip, { foreignKey: "trip_id", targetKey: "id" });

db.trip.hasMany(db.diary, { foreignKey: "trip_id", sourceKey: "id" });
db.diary.belongsTo(db.trip, { foreignKey: "trip_id", targetKey: "id" });

db.diary.belongsToMany(db.hashtag, {
  through: "diary_hashtag",
  foreignKey: "diary_id",
  sourceKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.hashtag.belongsToMany(db.diary, {
  through: "diary_hashtag",
  foreignKey: "hashtag_id",
  sourceKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.user.hasMany(db.post, { foreignKey: "user_id", sourceKey: "id" });
db.post.belongsTo(db.user, { foreignKey: "user_id", targetKey: "id" });

db.trip.hasOne(db.post);
db.post.belongsTo(db.trip);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
