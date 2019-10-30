const express = require("express");
const router = express.Router();
const signup = require("./signup");
const signin = require("./signin");
const authenticate = require("./authenticate");
const signout = require("./signout");
const confirmAccount = require("./confirm_account");
const resendConfirmationEmail = require("./resend_confirmation_email");
const confirm24HourMealReset = require("./confirm_24_hour_meal_reset");
const resetPasswordEmail = require("./reset_password_email");
const resetPassword = require("./reset_password");
const confirmResetPasswordToken = require("./confirm_reset_password_token");
const sendNewResetPasswordEmail = require("./send_new_reset_password_email");

router.use("/signup", signup);
router.use("/signin", signin);
router.use("/authenticate", authenticate);
router.use("/signout", signout);
router.use("/confirm-account", confirmAccount);
router.use("/resend-confirmation-email", resendConfirmationEmail);
router.use("/confirm-24-hour-meal-reset", confirm24HourMealReset);
router.use("/reset-password-email", resetPasswordEmail);
router.use("/reset-password", resetPassword);
router.use("/confirm-reset-password-token", confirmResetPasswordToken);
router.use("/send-new-reset-password-email", sendNewResetPasswordEmail);

module.exports = router;
