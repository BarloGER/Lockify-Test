const crypto = require("crypto");
const { UserInputPort } = require("./userInputPort");
const { userOutput } = require("./userOutputPort");

const userInputPort = new UserInputPort();

exports.CreateUser = class CreateUser {
  constructor(userRepository, passwordHashingService) {
    this.userRepository = userRepository;
    this.passwordHashingService = passwordHashingService;
  }

  async execute(input) {
    const user = userInputPort.createUser(input);

    if (await this.userRepository.existsByUsername(user.username)) {
      throw new Error("Username is already taken.");
    }
    if (await this.userRepository.existsByEmail(user.email)) {
      throw new Error("Email is already registered.");
    }

    user.password = await this.passwordHashingService.hashPassword(
      user.password
    );
    user.verificationCode = crypto.randomBytes(4).toString("hex");

    const savedUser = await this.userRepository.createUser(user);

    return userOutput({
      success: true,
      message: "User successfully created.",
      userId: savedUser.id,
    });
  }
};
