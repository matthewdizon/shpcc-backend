const express = require("express");
const {
  getAssociateApplications,
  createAssociateApplication,
} = require("../controllers/memberControllers");

const { authenticateToken } = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/associate", authenticateToken, getAssociateApplications);
router.post("/associate", authenticateToken, createAssociateApplication);

module.exports = router;
