const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  dialectOptions: {
    useUTC: true, // for reading from database
  },
  timezone: "+00:00", // for writing to database
});

class User extends Model {}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordUpdatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isNewsletterAllowed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verificationCode: {
      type: DataTypes.STRING,
    },
    verificationAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lastVerificationAttempt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: false,
    underscored: true,
  }
);

exports.UserRepository = class UserRepository {
  async existsByUsername(username) {
    const count = await User.count({ where: { username } });
    return count > 0;
  }

  async existsByEmail(email) {
    const count = await User.count({ where: { email } });
    return count > 0;
  }

  async createUser(userData) {
    const newUser = await User.create(userData);
    return newUser;
  }

  async findUserByEmail(email) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  async updateUserById(userId, updateData) {
    const [updatedCount, updatedUsers] = await User.update(updateData, {
      where: { userId },
      returning: true,
    });
    return updatedCount > 0 ? updatedUsers[0] : null;
  }

  async deleteUserById(userId) {
    const result = await User.destroy({
      where: { userId },
    });
    return result > 0;
  }
};
