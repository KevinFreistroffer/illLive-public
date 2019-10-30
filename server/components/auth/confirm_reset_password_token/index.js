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

router.get("/:token", async (req, res, next) => {
  if (req.params.token) {
    try {
      const decodedToken = await verifyToken(req.params.token);
      console.log(`decodedToken`, decodedToken);

      if (decodedToken) {
        const foundUser = await User.findOne({ email: decodedToken.email });
        console.log(`foundUser`, foundUser);

        if (!foundUser) {
          console.log(`!foundUser`);
          return res.status(404).json({
            data: "no user found with email from decoded token.email"
          });
        }

        console.log(`foundUser`);

        return res.status(200).json({
          email: decodedToken.email
        });
      } else {
        console.log(`!decodedToken`);

        return res.status(404).json({
          data: "no decodedToken"
        });
      }
    } catch (error) {
      console.log(`An error occured decoding the token`, error);
      next(error);
    }
  } else {
    return res.status(500).json({
      data: "no token"
    });
  }
});

module.exports = router;
