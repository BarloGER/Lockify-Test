const bcrypt = require("bcrypt");

exports.PasswordHashingService = class PasswordHashingService {
  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async comparePasswordHash(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }
};
