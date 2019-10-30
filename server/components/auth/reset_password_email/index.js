const express = require("express");
const router = express.Router();
const User = require("../user.model");
const authService = require("../authServices");

router.post("/", async (req, res, next) => {
  try {
    console.log(`/reset-password-email`, `email`, req.body.email);

    const foundUser = await User.findOne({ email: req.body.email });
    console.log(`foundUser`, foundUser.username);

    if (!foundUser) {
      res.status(401).json({
        success: false,
        data: "no found user with the requested email"
      });
    } else {
      const emailSuccessfullySentResponse = authService.sendResetPasswordEmail(
        req.body.email,
        authService.createAuthenticationToken(req.body.email)
      );

      console.log(
        `emailSuccessfullySentResponse`,
        emailSuccessfullySentResponse
      );

      if (false) {
        res.status(401).json({
          success: false,
          data: "no found user with the requested email"
        });
      }

      res.status(200).json({
        success: true,
        data: {}
      });
    }

    // Generate recoverPasswordToken
    // Send the email with the token to the foundUser
    // Send an email with a token
    // The user follows the link
    // The token is verified on the server
    // If a valid token
    // Allow the user to enter their new password
    // Send the new password to the server
    // On success, send a message saying password successfully reset
    // Have the user sign in again.
  } catch (error) {
    console.log(`An error occured in /password-rest`, error);
    next(error);
  }
});

module.exports = router;
