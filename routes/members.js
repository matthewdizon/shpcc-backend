const express = require("express");
const {
  getAssociateApplications,
} = require("../controllers/memberControllers");

const { authenticateToken } = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/associate", authenticateToken, getAssociateApplications);

module.exports = router;
