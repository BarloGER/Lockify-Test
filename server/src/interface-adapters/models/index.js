const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  dialectOptions: {
    useUTC: true, // for reading from database
  },
  timezone: "+00:00", // for writing to database
});

const User = require("./UserModel")(sequelize, Model, DataTypes);
const Account = require("./AccountModel")(sequelize, Model, DataTypes);

User.hasMany(Account, { foreignKey: "userId" });
Account.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  sequelize,
  Model,
  User,
  Account,
};
