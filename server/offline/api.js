const router = require("express").Router();
const signIn = require("./signin");
const recoverPassword = require("./recover-password");

router.use("/api/auth/signin", signIn);
router.use("/api/auth/recover-password", recoverPassword);

module.exports = router;
