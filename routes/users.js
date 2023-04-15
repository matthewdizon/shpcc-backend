const express = require("express");

const {
  createUser,
  loginUser,
  identifyUser,
  getUsers,
  verifyEmail,
  resendVerificationLink,
  getUser,
  updateUser,
  updateUserPassword,
  requestForgotPassword,
  resetUserPassword,
} = require("../controllers/userController");
const {
  authenticateAdminToken,
  authenticateToken,
} = require("../middleware/authenticateToken");

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/user", identifyUser);
router.get("/verifyEmail", verifyEmail);
router.post("/resendVerificationLink", resendVerificationLink);

router.get("/users", authenticateAdminToken, getUsers);
router.get("/:email", authenticateToken, getUser);
router.patch("/:email", authenticateToken, updateUser);
router.patch("/updatePassword/:email", authenticateToken, updateUserPassword);

router.post("/forgot-password", requestForgotPassword);
router.post("/reset-password/:token", resetUserPassword);

module.exports = router;
