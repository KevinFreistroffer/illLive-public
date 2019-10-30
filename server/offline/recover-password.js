const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(`offline /recover-password`);
  res.send({ data: "data" });
});

module.exports = router;
