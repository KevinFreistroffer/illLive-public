const express = require("express");
const router = express.Router();
const User = require("../../auth/user.model");

router.post('/', async(req, res, next) => {
	console.log(`/create-new-meal reached`);
	try {
		const meal = req.body.meal;
		console.log(req.session.userID);

		if (!meal.hasOwnProperty('_id')) {
			User.findOneAndUpdate(
				{ _id: req.session.userID },
				{ $push: { meals: meal } },
				{ upsert: true, new: true },
				(error, savedUser) => {
					if (error) {
						next(error);
					} 

					if (!savedUser) {
						res.status(404).json({
							data: 'no saved user'
						});
					}

					res.status(200).json({
						data: savedUser
					});
				}
			);
		} else {

		}
	} catch(error) {
		console.log(`An error occured /newMeal`, error);
		next(error);
	}
});

module.exports = router;