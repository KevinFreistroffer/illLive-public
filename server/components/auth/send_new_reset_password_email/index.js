const router = require("express").Router();

router.post("/", async (req, res, next) => {
  return res.status(200).json({
    data: "data"
  });
});

module.exports = router;
