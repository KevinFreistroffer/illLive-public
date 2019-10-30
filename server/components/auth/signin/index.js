const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../user.model");
const { FIND_USER_ERROR, COMPARE_PASSWORD_ERROR } = require("../constants");
const { comparePasswords } = require("../authServices");
const securedUserResponseObject = require("../securedUserResponseObject");

router.post("/", async (req, res, next) => {
  try {
    console.log(`/api/auth/signin`);
    const { login, password, rememberMe } = req.body;
    console.log(login, password, rememberMe);

    let foundUser = await User.findOne({
      $or: [{ username: login }, { email: login }]
    });
    console.log(foundUser);

    if (!foundUser) {
      return res.status(401).json({
        success: false,
        data: "Invalid username or password"
      });
    }

    const passwordIsValid = await comparePasswords(
      password,
      foundUser.password
    );

    if (passwordIsValid) {
      req.session.userID = foundUser._id;
      console.log(req.session);
      console.log(`session.userID`, req.session.userID);

      if (rememberMe) {
        req.session.cookie.maxAge = 2628000000;
      }
      res.status(200).send({ data: securedUserResponseObject(foundUser) });
    } else {
      console.log(`!passwordIsValid`);
      res.status(401).json({ data: "Invalid username or password" });
    }
  } catch (error) {
    console.log(typeof error, Object.keys(error));
    console.log(`An error occured in try block`, error);
    next(error);
  }
});

module.exports = router;
