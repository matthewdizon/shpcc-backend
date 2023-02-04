const express = require("express");

const {
  createUser,
  loginUser,
  identifyUser,
  getUsers,
  verifyEmail,
} = require("../controllers/userController");
const { authenticateAdminToken } = require("../middleware/authenticateToken");

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/user", identifyUser);
router.get("/verifyEmail", verifyEmail);

router.get("/users", authenticateAdminToken, getUsers);

module.exports = router;
