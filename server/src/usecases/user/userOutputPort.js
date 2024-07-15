exports.UserOutputPort = class UserOutputPort {
  constructor() {
    this.success = false;
    this.message = {};
    this.user = {};
  }

  formatCreatedUser(createdUser) {
    return {
      success: true,
      message: {
        EN: "Your registration was successful! Please confirm your e-mail address by entering the verification code we sent you. Don't forget to check your spam folder too.",
        DE: "Deine Registrierung war erfolgreich! Bitte bestätige deine E-Mail-Adresse durch Eingabe des Verifizierungscodes, den wir dir zugesendet haben. Vergiss nicht, auch deinen Spam-Ordner zu überprüfen.",
      },
      user: createdUser.dataValues,
    };
  }

  formatFoundUser(deletedUser) {
    return {
      success: true,
      message: {
        EN: "Login successful.",
        DE: "Anmeldung erfolgreich.",
      },
      user: deletedUser.dataValues,
    };
  }

  formatUpdatedUser(updatedUser) {
    return {
      success: true,
      message: {
        EN: "User updated successfully.",
        DE: "Benutzer erfolgreich aktualisiert",
      },
      user: updatedUser.dataValues,
    };
  }

  formatDeletedUser(deletedUser) {
    return {
      success: true,
      message: {
        EN: "User deleted successfully.",
        DE: "Benutzer erfolgreich gelöscht.",
      },
      user: deletedUser.dataValues,
    };
  }

  formatBlockedUser(foundUser) {
    return {
      success: false,
      message: {
        EN: "Your account has been blocked, please contact support.",
        DE: "Dein Account wurde gesperrt, wende dich an den Support.",
      },
      user: foundUser.dataValues,
    };
  }

  formatSuccessfulVerification(updatedUser) {
    return {
      success: true,
      message: {
        EN: "You have successfully confirmed your email address.",
        DE: "Du hast deine Email-Adresse erfolgreich bestätigt.",
      },
      user: updatedUser.dataValues,
    };
  }

  formatUpdatedVerificationCode(updatedUser) {
    return {
      success: true,
      message: {
        EN: "A new verification code has been sent to your email address. Don't forget to check your spam folder as well.",
        DE: "Dir wurde ein neuer Verifizierungscode an deine Email Adresse gesendet. Vergiss nicht auch deinen Spam Ordner zu überprüfen.",
      },
      user: updatedUser.dataValues,
    };
  }

  formatUpdatedPassword(updatedUser) {
    return {
      success: true,
      message: {
        EN: "A new password has been sent to your email address. Don't forget to check your spam folder as well.",
        DE: "Dir wurde ein neues Passwort an deine Email Adresse gesendet. Vergiss nicht auch deinen Spam Ordner zu überprüfen.",
      },
      user: updatedUser.dataValues,
    };
  }
};
