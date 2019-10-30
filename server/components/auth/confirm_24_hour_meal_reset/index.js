const router = require("express").Router();
const User = require("../user.model");
const securedUserResponseObject = require('../securedUserResponseObject');

router.get("/", (req, res, next) => {
  console.log(`/confirm-24-hour-meal-reset`);

    // TODO: figure out how to async await. Originally tried setting vars
    // outside and applying server error, no found user and success to the vars
    // checking the values outside of findOneAndUpdate and sending a response based
    // on value.
    User.findOneAndUpdate(
      { _id: req.session.userID },
      { $set: { confirmed24HourMealResetMessage: true } },
      { new: true },
      (error, updatedUser) => {
        console.log(`error updatedUser`, error, updatedUser);
        if (error) {
          return res.status(500).json({ data: error });
        } 

        if (!updatedUser) {
          return res.status(404).json({ data: 'No user found' });
        }

        return res.status(200).json({ data: updatedUser });
      }
    );
});

module.exports = router;
