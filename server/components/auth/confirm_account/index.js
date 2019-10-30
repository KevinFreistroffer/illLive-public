const router = require("express").Router();
const User = require("../user.model");
const {
  createConfirmationToken,
  sendConfirmationEmail,
  verifyToken
} = require("../authServices");
const { FIND_USER_ERROR, SAVE_USER_ERROR } = require("../constants");
const config = require("../../../config/private_config");
const securedUserResponseObject = require("../securedUserResponseObject");

router.get("/:token", (req, res) => {
  const token = req.params.token;

  if (token && token.trim().length > 0) {
    verifyToken(token)
      .then(token => {
        User.find({ email: token.email })
          .then((foundUser, error) => {
            if (error) {
              return Promise.reject({
                type: FIND_USER_ERROR,
                data: error
              });
            }

            // Token was valid. Save user with accountConfirmed set to true.
            if (foundUser && foundUser.length) {
              let newUserObj = new User(foundUser[0]);
              newUserObj.accountConfirmed = true
              let confirmedUser = newUserObj; // why?
              confirmedUser.save((error, savedUser) => {
                if (error) {
                  return Promise.reject({
                    type: SAVE_USER_ERROR,
                    data: error
                  }); 
                } 

                console.log(
                  `Success saving the user with confirmedAccount set to true`,
                  savedUser
                );

                req.session.userID = savedUser._id;

                res.status(201).json({
                  success: true,
                  invalidToken: false,
                  tokenExpired: false,
                  message:
                    "Success saving the user with confirmedAccount = true",
                  dataDescription: "",
                  data: {}
                });
              });

              // Invalid token
            } else {
              console.log("Token email didn't match any. Invalid token");
              // 422 set because: https://stackoverflow.com/questions/1959947/whats-an-appropriate-http-status-code-to-return-by-a-rest-api-service-for-a-val
              res.status(422).json({
                success: false,
                invalidToken: true,
                tokenExpired: false,
                message: "Invalid token.",
                dataDescription: "",
                data: {}
              });
            }
          })
          .catch(error => {
            switch (error.type) {
              case FIND_USER_ERROR:
                res.status(500).json({
                  success: false,
                  invalidToken: false,
                  tokenExpired: false,
                  message: "Error finding a user.",
                  dataDescription: "[error.data]",
                  data: {
                    errors: [error.data]
                  }
                });
              case SAVE_USER_ERROR:
                res.status(500).json({
                  success: false,
                  invalidToken: false,
                  tokenExpired: false,
                  message: "Error saving a user",
                  dataDescription: "[error.data]",
                  data: {
                    errors: [error.data]
                  }
                });
              default:
                res.status(500).json({
                  success: false,
                  invalidToken: false,
                  tokenExpired: false,
                  message: "Default error.",
                  dataDescription: "",
                  data: {}
                });
            }
          });
      })
      .catch(error => {
        if (error['name'] == "TokenExpiredError" || error['message'] === 'jwt expired') {
         return res.json({
            success: false,
            invalidToken: true,
            tokenExpired: true,
            message: "Your token expired. Please enter your email address and have another one sent.",
            dataDescription: "",
            data: {}
          });
        } else {
          res.json({
            success: false,
            invalidToken: true,
            tokenExpired: false,
            message: "Some other type of error. Invalid token, token expired or some other type of error.",
            dataDescription: "",
            data: {}
          });
        }
      });
  } else {
    res.status(500).json({
      success: false,
      invalidToken: true,
      tokenExpired: true,
      message: "Confirmation token expired.",
      dataDescription: "token",
      data: {
        token
      }
    });
  }
});

module.exports = router;
