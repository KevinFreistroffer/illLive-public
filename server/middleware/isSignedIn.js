const router = require('express').Router();

router.get('/', ( req, res, next ) => {

	if (!req.user) {
		return res.status(401);
	} else {
		return res.json({ data: 'data' });
	}
});

module.exports = router;