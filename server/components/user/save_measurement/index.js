const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../../auth/user.model');
const securedUserResponseObject = require('../../auth/securedUserResponseObject');


router.post('/', (req, res) => {
	const { measurement } = req.body;

	try {
		User.findOneAndUpdate(
		{ _id: req.session.userID },
		{ $push: { measurements: measurements } },
		{ new: 'true' },
		(error, savedUser) => {
			if (error) {
				console.log(`An error occured finding a User`, error);

				res.json({
					success: false,
					message: 'An error occured saving the item. Try again, please.',
					dataDescription: "{ error } error returned",
					data: {
						error
					}
				});
			}

			if (savedUser) {
				console.log(`savedUser`, savedUser);

				req.session.user = setSessionUser(savedUser);

				res.json({
					success: true,
					message: 'Item saved.',
					dataDescription: "savedUser",
					data: {
						savedUser
					}
				});
			}
		});
	} catch(error) {
		next(error);
	}
});


module.exports = router;