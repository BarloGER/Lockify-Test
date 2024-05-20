const { Sequelize, Model, DataTypes } = require("sequelize");
const { UserEntity } = require("../../entities/User");

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
      type: DataTypes.NUMBER,
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
    const user = await User.findOne({ where: { username } });
    return user !== null;
  }

  async existsByEmail(email) {
    const user = await User.findOne({ where: { email } });
    return user !== null;
  }

  async createUser(userData) {
    const userEntity = new UserEntity(userData);

    const validationError = userEntity.validateCreateUser();
    if (validationError) {
      console.error("Validation errors:", validationErrors);
      throw new Error("Validation failed. Please check the data.");
    }

    const newUser = User.create(userData);

    return newUser;
  }
};
