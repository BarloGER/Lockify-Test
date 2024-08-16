const language = localStorage.getItem("language");

const URL = import.meta.env.VITE_API_KEY;
const MAILSERVER_URL = import.meta.env.VITE_MAILSERVER_URL;

export const UserRepository = class UserRepository {
  async checkAuthAndGetUserRequest() {
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

  async registerUserRequest(validEncryptedUserEntity) {
    try {
      const response = await fetch(`${URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify(validEncryptedUserEntity),
        credentials: "include",
      });
      return response.json();
    } catch (error) {
      return error;
    }
  }

  async authenticateUserRequest(validUserCredentialsEntity) {
    try {
      const response = await fetch(`${URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify(validUserCredentialsEntity),
        credentials: "include",
      });
      return response.json();
    } catch (error) {
      return error;
    }
  }

  async updateUserRequest(updatedData) {
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

  async deleteUserRequest() {
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

  async logoutUserRequest() {
    try {
      const response = await fetch(`${URL}/user/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify({}),
        credentials: "include",
      });
      return response.json();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async confirmEmailAddressRequest(verificationData) {
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

  async newVerificationCodeRequest(requestData) {
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

  async newPasswordRequest(requestData) {
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
