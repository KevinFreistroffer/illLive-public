const router = require("express").Router();
const User = require("../user.model");
const securedUserResponseObject = require("../securedUserResponseObject");

router.get("/", async (req, res, next) => {
  console.log(`/api/auth/authenticate reached`, req.session.userID);
  // res.status(200).json({ data: "data" });
  try {
    if (req.session.userID) {
      const foundUser = await User.findOne({ _id: req.session.userID });

      if (!foundUser) {
        res.status(401).json({ data: "no user found" });
      } else {
        res.status(200).json({ data: securedUserResponseObject(foundUser) });
      }
    } else {
      res.status(500).json({ data: "no session exists" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
