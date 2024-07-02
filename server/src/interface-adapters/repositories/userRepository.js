const { User } = require("../models");

exports.UserRepository = class UserRepository {
  async existsByUsername(username) {
    const count = await User.count({ where: { username } });
    return count > 0;
  }

  async existsByEmail(email) {
    const count = await User.count({ where: { email } });
    return count > 0;
  }

  async findUserByEmail(email) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  async findUserById(userId) {
    const user = await User.findByPk(userId);
    return user;
  }

  async createUser(userData) {
    const newUser = await User.create(userData);
    return newUser;
  }

  async updateUser(userId, updateData) {
    const user = await User.findByPk(userId);
    if (!user) {
      return null;
    }

    // Update the user's fields.
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] !== undefined) {
        user[key] = updateData[key];
      }
    });

    const savedUser = await user.save();
    return savedUser;
  }

  async deleteUser(userId) {
    const result = await User.destroy({
      where: { userId },
    });
    return result > 0;
  }
};
