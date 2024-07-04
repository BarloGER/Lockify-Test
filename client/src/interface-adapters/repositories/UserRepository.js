const language = localStorage.getItem("language");

const URL = import.meta.env.VITE_API_KEY;
const MAILSERVER_URL = import.meta.env.VITE_MAILSERVER_URL;

export const UserRepository = class UserRepository {
  async checkAuthAndGetUser() {
    try {
      const response = await fetch(`${URL}/user/get-user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        credentials: "include",
      });

      return response.json();
    } catch (error) {
      return error.message;
    }
  }

  async registerUser(userData) {
    try {
      const response = await fetch(`${URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: userData.password,
          encryptedSecret: userData.encryptedSecret,
          secretEncryptionIv: userData.secretEncryptionIv,
          secretEncryptionSalt: userData.secretEncryptionSalt,
          isNewsletterAllowed: userData.isNewsletterAllowed,
        }),
        credentials: "include",
      });
      return response.json();
    } catch (error) {
      return error;
    }
  }

  async loginUser(credentials) {
    try {
      const response = await fetch(`${URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
        credentials: "include",
      });
      return response.json();
    } catch (error) {
      return error;
    }
  }

  async updateUser(updatedData) {
    try {
      const response = await fetch(`${URL}/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify({
          updatedData,
        }),
        credentials: "include",
      });
      return response.json();
    } catch (error) {
      return error;
    }
  }

  async deleteUser() {
    try {
      const response = await fetch(`${URL}/user/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        credentials: "include",
      });
      return response.json();
    } catch (error) {
      return error;
    }
  }

  async confirmEmailAddress(verificationData) {
    try {
      const response = await fetch(`${URL}/user/confirm-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify({
          verificationCode: verificationData.verificationCode,
        }),
        credentials: "include",
      });

      return response.json();
    } catch (error) {
      return error;
    }
  }

  async requestNewVerificationCode(requestData) {
    try {
      const response = await fetch(`${URL}/user/send-new-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify({
          email: requestData.email,
        }),
        credentials: "include",
      });

      return response.json();
    } catch (error) {
      return error;
    }
  }

  async requestNewPassword(requestData) {
    try {
      const response = await fetch(`${URL}/user/send-new-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify({
          email: requestData.email,
        }),
        credentials: "include",
      });

      return response.json();
    } catch (error) {
      return error;
    }
  }

  async sendSupportMail(userData) {
    try {
      const response = await fetch(`${MAILSERVER_URL}/mail/send-mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          subject: userData.subject,
          html: userData.html,
        }),
      });

      return response.json();
    } catch (error) {
      return error;
    }
  }
};
