const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../user.model");
const config = require("../../../config");
const privateConfig = require("../../../config/private_config");
const {
  hashPassword,
  comparePasswords,
  createConfirmationToken,
  sendConfirmationEmail
} = require("../authServices");
const securedUserResponseObject = require("../securedUserResponseObject");

let responseObject = {
  success: false,
  userameTaken: false,
  emailTaken: false,
  message: "",
  data: {
    description: "",
    payload: null
  }
};

const sendErrorResponse = (message, dataDescription, data, res) => {
  res.status(500).json({
    success: false,
    usernameTaken: false,
    emailTaken: false,
    message,
    dataDescription,
    data
  });

  return;
};

router.post("/", (req, res) => {
  console.log(`/signup reached`);
  const { username, email, password } = req.body;

  try {
    User.find({ $or: [{ username }, { email }] }, (error, foundUser) => {
      if (error) {
        sendErrorResponse(
          "My bad ... please try again.",
          "error",
          { data: { error } },
          res
        );
      }

      // Username or email are already assigned to a user.
      if (foundUser && foundUser.length) {
        res.status(409).json({
          success: false,
          userameTaken: true,
          emailTaken: true,
          message: "Username or email already registered.",
          dataDescription: "foundUser",
          data: {
            foundUser
          }
        });

        return;
      }

      // Username and email are free to register
      console.log(`Username and email are free to register.`);

      hashPassword(password)
        .then(hashedPassword => {
          const userToken = jwt.sign(
            { username, email, password },
            privateConfig.secret
          );
          const confirmAccountToken = createConfirmationToken(email);
          const newUser = new User({
            username,
            email,
            password: hashedPassword,
            //jwt: userToken,
            confirmAccountToken,
            accountConfirmed: false,
            confirmed24HourMealResetMessage: false,
            confirmedCookie: false,
            foodDrinks: [],
            vitamins: [],
            meals: [],
            measurements: [
              "Teaspoon",
              "Tablespoon",
              "Cup",
              "Quart",
              "Per",
              "Slice",
              "Handful",
              "Leaf",
              "Bowl",
              "Bag",
              "Container",
              "Ounce"
            ]
          });

          // Save a new user.
          newUser.save((error, savedUser) => {
            // req.session.user = setSessionUser(savedUser);

            if (error) {
              console.log(`Error saving a user.`, error);
              sendErrorResponse(
                "My bad ... please try again.",
                "Saving a user error",
                { data: { error } },
                res
              );
            }

            sendConfirmationEmail(email, confirmAccountToken)
              .then(emailSentInfo => {
                return res.status(201).json({
                  success: true,
                  usernameTaken: false,
                  emailTaken: false,
                  message: "Successfully saved a user.",
                  dataDescription: "",
                  data: {}
                });

                return;
              })
              .catch(error => {
                sendErrorResponse(
                  "My bad ... please retry.",
                  "Email sending error",
                  { data: { error } },
                  res
                );
              });
          });
        })
        .catch(error => {
          sendErrorResponse(
            "My bad ... please retry.",
            "Hashing password error.",
            { data: { error } },
            res
          );
        });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occured",
      data: error
    });
  }
});

module.exports = router;
