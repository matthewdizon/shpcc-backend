const express = require("express");
const {
  getAssociateApplications,
  createAssociateApplication,
  getAssociateApplication,
  updateAssociateApplication,
} = require("../controllers/memberControllers");

const { authenticateToken } = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/associate", authenticateToken, getAssociateApplications);
router.post("/associate", authenticateToken, createAssociateApplication);
router.get("/associate/:email", authenticateToken, getAssociateApplication);
router.patch(
  "/associate/:email",
  authenticateToken,
  updateAssociateApplication
);

module.exports = router;
