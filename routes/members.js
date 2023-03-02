const express = require("express");
const {
  getAssociateApplications,
  createAssociateApplication,
  getAssociateApplication,
} = require("../controllers/memberControllers");

const { authenticateToken } = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/associate", authenticateToken, getAssociateApplications);
router.post("/associate", authenticateToken, createAssociateApplication);
router.get("/associate/:email", authenticateToken, getAssociateApplication);

module.exports = router;
