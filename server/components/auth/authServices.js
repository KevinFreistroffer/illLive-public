const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const config = require("../../config");
const privateConfig = require("../../config/private_config.js");

module.exports = {
  /*
   * @return Promise of error or hashedPassword <string>
   */
  hashPassword: password => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function(error, salt) {
        if (error) reject(error);

        bcrypt.hash(password, salt, function(error, hashedPassword) {
          if (error) reject(error);
          resolve(hashedPassword);
        });
      });
    });
  },

  /*
   * @return boolean
   */
  comparePasswords: async (password, hash, callback) => {
    return bcrypt.compare(password, hash);
  },

  /*
   * @return signed JWT to confirm their account
   */
  createConfirmationToken: email => {
    return jwt.sign({ email }, privateConfig.secret, {
      expiresIn: "30m"
    });
  },

  /*
   * Generates a JWT token to authenticate a user
   */
  createAuthenticationToken: email => {
    return jwt.sign({ email }, privateConfig.secret, {
      expiresIn: "30d"
    });
  },

  /*
   * Generates a JWT token for routes requiring authentication
   */
  createAPIToken: email => {
    return jwt.sign({ email }, privateConfig.secret, {
      expiresIn: "5m"
    });
  },

  /*
   * @return Promise error or emailSentInfo object
   */
  sendConfirmationEmail: (email, confirmAccountToken) => {
    console.log(`[authServices -> sendConfirmationEmail()]`);

    let mailOptions = {};

    return new Promise((resolve, reject) => {
      if (config.environment === "development") {
        mailOptions = {
          from: '"illLiveBranch" <kevin.freistroffer@gmail.com>',
          to: "kevin.freistroffer@gmail.com",
          subject: "Confirm your email",
          text:
            "Please click on the following link to confirm your email address. Some other important carefully selected words.",
          html:
            '<h1><a href="http://localhost:3000/confirm-account/' +
            confirmAccountToken +
            '">Click here to confirm your illLive account</a></h1>'
        };
      } else {
        mailOptions = {
          from: `"React Admin" <${email}>`,
          to: `${email}`,
          subject: "React Project Confirm Account",
          text: "Confirm your account.",
          html:
            '<h1><a href="http://localhost:3000/confirm-account/' +
            confirmAccountToken +
            '">Click here to confirm your illLive account</a></h1>'
        };
      }

      nodemailer
        .createTransport({
          service: "gmail",
          auth: {
            user: privateConfig.smtp.username,
            pass: privateConfig.smtp.password
          }
        })
        .sendMail(mailOptions, (error, emailSentInfo) => {
          if (error) {
            console.log(
              `[authServices -> sendConfirmationEmail()] An error occured sending confirmation email`,
              error
            );
            reject(error);
          } else {
            console.log(
              `[authServices -> sendConfirmationEmail()] Successfully sent confirmation email`,
              emailSentInfo
            );
            resolve(emailSentInfo);
          }
        });
    });
  },

  /*
   * @return Promise error or emailSentInfo object
   */
  sendResetPasswordEmail: (email, confirmAccountToken) => {
    console.log(
      `[authServices -> sendPasswordResetEmail()]`,
      email,
      confirmAccountToken
    );

    let mailOptions = {};

    return new Promise((resolve, reject) => {
      if (config.environment === "development") {
        mailOptions = {
          from: '"illLiveBranch" <kevin.freistroffer@gmail.com>',
          to: "kevin.freistroffer@gmail.com",
          subject: "Reset your password.",
          text: "Please click on the following link to reset your password.",
          html:
            '<h1><a href="http://localhost:3000/confirm-reset-password-token/' +
            confirmAccountToken +
            '">Click here to reset your password.</a></h1>'
        };
      } else {
        mailOptions = {
          from: `"React Admin" <${email}>`,
          to: `${email}`,
          subject: "Reset your password",
          text: "Reset your password",
          html:
            '<h1><a href="http://localhost:3000/confirm-reset-password-token/' +
            confirmAccountToken +
            '">Click here to reset your password.</a></h1>'
        };
      }

      nodemailer
        .createTransport({
          service: "gmail",
          auth: {
            user: privateConfig.smtp.username,
            pass: privateConfig.smtp.password
          }
        })
        .sendMail(mailOptions, (error, emailSentInfo) => {
          if (error) {
            console.log(
              `[authServices -> sendConfirmationEmail()] An error occured sending confirmation email`,
              error
            );
            reject(error);
          } else {
            console.log(
              `[authServices -> sendConfirmationEmail()] Successfully sent confirmation email`,
              emailSentInfo
            );
            resolve(emailSentInfo);
          }
        });
    });

    return new Promise((resolve, reject) => {
      resolve({ data: "data" });
    });
  },

  /*
   * Verify JWT token
   */
  verifyToken: token => {
    return jwt.verify(token, privateConfig.secret, (err, decoded) => {
      console.log(`decoded`, decoded);
      return new Promise((resolve, reject) => {
        if (err) {
          reject(err);
        }

        resolve(decoded);
      });
    });
  }
};
