const express = require("express");
const router = express.Router();
const User = require("../user.model");
const authService = require("../authServices");

router.post("/", async (req, res, next) => {
  console.log(`reset password`);
  const email = req.body.email;
  const password = req.body.password;

  console.log(`email`, `password`, email, password);

  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      res.status(401).json({
        success: false,
        data: "no found user with the requested email"
      });
    } else {
      console.log("password before hashing it", password);
      authService.hashPassword(password).then(hashedPassword => {
        console.log("hashedPassword", hashedPassword);
        User.findOneAndUpdate(
          { email },
          { $set: { password: hashedPassword } },
          { upsert: true },
          (error, savedUser) => {
            console.log(error, savedUser);
            if (error) {
              console.log(`error`);
              return res.status(500).json({
                data: error
              });
            }

            console.log(`!error`);

            if (!savedUser) {
              console.log(`!savedUser`);
              return res.status(404).json({
                data: "no saved user"
              });
            }

            console.log(`savedUser`);

            console.log("password updated", savedUser.password);

            return res.status(200).json({
              data: "password updated"
            });
          }
        );
      });
    }
  } catch (error) {
    console.log(`An error occured in /reset-password`, error);
    next(error);
  }
});

module.exports = router;
