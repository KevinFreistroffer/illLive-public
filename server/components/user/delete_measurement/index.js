const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
	res.json({
		success: false,
		dataDescription: "error",
		data: {
			error: 'error'
		}	
	});
});


module.exports = router;