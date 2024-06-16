export class UserInteractor {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async login(userInput) {
    try {
      const login = await this.userRepository.login(userInput);
      return login;
    } catch (error) {
      console.log("UserInteractor", error);
    }
  }

  async register(userInput) {
    try {
      const register = await this.userRepository.register(userInput);
      return register;
    } catch (error) {
      console.log("UserInteractor", error);
    }
  }

  async verify(userInput) {
    console.log(userInput);
    try {
      const verify = await this.userRepository.verify(userInput);
      return verify;
    } catch (error) {
      console.log("UserInteractor", error);
    }
  }

  async getUser() {
    try {
      const user = await this.userRepository.getUser();
      console.log("getUser", user);
      return user;
    } catch (error) {
      console.log("User Interactor", error);
    }
  }

  async sendNewCode(userInput) {
    try {
      const sendMail = await this.userRepository.sendNewCode(userInput);
      return sendMail;
    } catch (error) {
      console.log("User Interactor", error);
    }
  }

  async sendNewPassword(userInput) {
    try {
      const sendMail = await this.userRepository.sendNewPassword(userInput);
      return sendMail;
    } catch (error) {
      console.log("User Interactor", error);
    }
  }

  async sendSupportMail(userInput) {
    try {
      const sendMail = await this.userRepository.sendSupportMail(userInput);
      return sendMail;
    } catch (error) {
      console.log("User Interactor", error);
    }
  }
}
