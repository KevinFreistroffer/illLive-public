const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../../auth/user.model");
const securedUserResponseObject = require("../../auth/securedUserResponseObject");

router.post("/", (req, res, next) => {
	console.log(`/save-meals`);
	try {
		const { meals } = req.body;
		let newMeals = [];
		let latestSavedUser = {};

		meals.forEach( async (meal, index) => {
			let updateError;
			let noSavedUser = false;

			// Handle adding new meals
			if (!meal._id) {
				console.log('!meal._id');
				User.findOneAndUpdate(
					{ _id: req.session.userID }, 
					{ $push: { meals: meal } },
					{ new: true },
					(error, savedUser) => {
						console.log('!meal._id eror savedUser', error, savedUser);
						latestSavedUser = savedUser;

						if (error) {
							console.log(`error pushing into meals`, error);
							updateError = error;
						} else if (!savedUser) {
							noSavedUser = true
						} else {
							latestSavedUser = savedUser;
						}
					}
				);

				if (updateError) {
					return res.status(500).json({ data: updateError });
				}

				if (noSavedUser) {
					return res.status(404).json({ data: 'noSavedUser' });
				} 

			} else {
				console.log(`meal._id`);	
				const foundUser = await User.findById({ _id: req.session.userID });
				if (!foundUser) {
					return res.status(404).json({ data: '!foundUser' });
				}

				foundUser.meals[index] = meal;
				foundUser.markModified('meals');
				const savedUser = await foundUser.save();
				if (!savedUser) {
					return res.status(404).json({ data: '!savedUser' });
				}

				latestSavedUser = savedUser;
			}
	
		});

		console.log(`outside of the too late timing, meals loop latestSavedUser`, latestSavedUser);
		res.status(200).json({ data: latestSavedUser });

	} catch (error) {
		console.log(`catch block`, error);
		next(error);
	}
});

module.exports = router;
