const router = require("express").Router();
const {
  createConfirmationToken,
  sendConfirmationEmail,
  verifyToken
} = require("../authServices");
const User = require("../user.model");

router.post("/", (req, res) => {
  console.log(`/resend-confirmation-email reached`, req.params.token);

  const email = req.body.email;

  User.findOne({ email }, (error, foundUser) => {
    console.log(`User.findOne callback reached.`);

    if (error) {
      console.log(`Error finding a user.`, error);

      // TODO: Don't send specific error obj
      res.status(500).json({
        success: false,
        error: true,
        // TODO chanage this message
        message: "My bad ... please try refreshing the page.",
        dataDescription: "Error object trying to find a user",
        data: {
          error
        }
      });
    }

    console.log(foundUser);

    if (foundUser && foundUser !== null) {
      console.log(`Found user by email`, foundUser);

      let token = createConfirmationToken(email);

      sendConfirmationEmail(email, token)
        .then(emailSentInfo => {
          res.status(200).json({
            success: true,
            error: false,
            message: "An email has been sent!",
            dataDescription: "Email sent info",
            data: {
              emailSentInfo
            }
          });
        })
        .catch(error => {
          res.status(500).json({
            success: false,
            error: error,
            message: "My bad ... please try again.",
            dataDescription: "Email sent error.",
            data: {
              error
            }
          });
        });
    } else {
      console.log(`No user found.`);

      res.status(500).json({
        success: false,
        error: false,
        message: "No account has been registered with that email.",
        dataDescription: "",
        data: {}
      });
    }
  });
});

module.exports = router;
