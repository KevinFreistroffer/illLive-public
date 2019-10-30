const router = require('express').Router();

router.post('/', (req, res) => {
  res.send({ data: 'data' });
});

module.exports = router;
