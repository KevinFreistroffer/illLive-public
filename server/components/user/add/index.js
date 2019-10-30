const router = require("express").Router();
const User = require("../../auth/user.model");
const { FIND_USER_ERROR, SAVED_USER_ERROR } = require("./constants");
const securedUserResponseObject = require("../../auth/securedUserResponseObject");

router.post("/", (req, res) => {
  console.log(`/user/add reached`);
  console.log("req.session", req.session);

  try {
    const { details, nutritionalData } = req.body.foodDrink;
    console.log(details, nutritionalData);

    const foodDrink = {
      name: details.name,
      foodOrDrink: details.foodOrDrink,
      selectedMeasurement: details.selectedMeasurement,
      calories: nutritionalData.calories,
      vitaminA: nutritionalData.vitaminA,
      vitaminB1: nutritionalData.vitaminB1,
      vitaminB2: nutritionalData.vitaminB2,
      vitaminB3: nutritionalData.vitaminB3,
      vitaminB5: nutritionalData.vitaminB5,
      vitaminB6: nutritionalData.vitaminB6,
      vitaminB7: nutritionalData.vitaminB7,
      vitaminB12: nutritionalData.vitaminB12,
      calcium: nutritionalData.calcium,
      choline: nutritionalData.choline,
      chromium: nutritionalData.chromium,
      copper: nutritionalData.copper,
      flouride: nutritionalData.flouride,
      folicAcid: nutritionalData.folicAcid,
      iodine: nutritionalData.iodine,
      iron: nutritionalData.iron,
      magnesium: nutritionalData.magnesium,
      molybdenum: nutritionalData.molybdenum,
      phosphorus: nutritionalData.phosphorus,
      potassium: nutritionalData.potassium,
      selenium: nutritionalData.selenium,
      salt: nutritionalData.salt,
      vitaminD3: nutritionalData.vitaminD3,
      vitaminE: nutritionalData.vitaminE,
      vitaminK: nutritionalData.vitaminK,
      zinc: nutritionalData.zinc
    };

    console.log(foodDrink);

    User.findOneAndUpdate(
      { _id: req.session.userID },
      {
        $push: {
          foodDrinks: foodDrink
        },
        $set: {
          measurements: details.measurements
        }
      },
      { new: "true" },
      (error, savedUser) => {
        if (error) {
          console.log(`An error occured finding a User`, error);
          res.status(500).json({
            success: false,
            message: "An error occured saving the item. Try again, please.",
            dataDescription: "{ error } error returned",
            data: {
              error
            }
          });
        }

        if (savedUser) {
          console.log(`savedUser`, savedUser);
          req.session.userID = savedUser._id;
          console.log(req.session.user);
          res.status(200).json({
            success: true,
            message: "Item saved.",
            dataDescription: "savedUser",
            data: {
              savedUser: securedUserResponseObject(savedUser)
            }
          });
        }
      }
    );
  } catch (error) {
    console.log(`catch error`, error);
    res.status(500).json({
      success: false,
      message: "Error",
      data: error
    });
  }
});

module.exports = router;
