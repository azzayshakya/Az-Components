const router = require("express").Router();
const {
  register,
  login,
  checkUsername,
  checkEmail,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/check-username/:username", checkUsername);
router.get("/check-email/:email", checkEmail);

module.exports = router;
