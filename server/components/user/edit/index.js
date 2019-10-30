const router = require("express").Router();
const User = require("../../auth/user.model");
const { FIND_USER_ERROR, EDIT_CONSUMEABLE_ERROR } = require("./constants");
const securedUserResponseObject = require("../../auth/securedUserResponseObject");

router.post("/", (req, res) => {
	console.log(`/api/edit reached`, req.body);

	User.findOne({ $or: [{ username: login }, { email: login }] })
		.then((foundUser, error) => {
			if (error) {
				return Promise.reject({
					type: FIND_USER_ERROR,
					data: error
				});
			}

			console.log(`foundUser`, foundUser);

			if (foundUser) {
				// get edit data from req.body
				// save
				// res.json
				// or handle reject errors

				// TODO move this to savedUser
				req.session.user = setSessionUser(foundUser);
			} else {
				res.json({
					success: false,
					message: "User not found.",
					dataDescription:
						"{login, password} data passed to this route",
					data: {
						login,
						password
					}
				});
			}
		})
		.catch(error => {
			// TODO handle errors
			switch (error.type) {
				case FIND_USER_ERROR:
					console.log(`FIND_USER_ERROR`);
					break;
				case EDIT_CONSUMEABLE_ERROR:
					console.log(`EDIT_CONSUMEABLE_ERROR`);
					break;
				default:
					console.log(`default`);
					break;
			}

			res.json({
				success: false,
				message: error.type,
				dataDescription: `error ${error.type}`,
				data: {
					error
				}
			});
		});
});

module.exports = router;
