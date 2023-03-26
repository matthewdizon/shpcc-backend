const express = require("express");
const {
  getGintongButilLoanApplications,
  createGintongButilLoanApplication,
  getGintongButilLoanApplication,
  updateGintongButilLoanApplication,
  getUserGintongButilLoanApplications,
} = require("../controllers/loanController");

const { authenticateToken } = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/gbl", authenticateToken, getGintongButilLoanApplications);
router.get(
  "/gbl/history/:email",
  authenticateToken,
  getUserGintongButilLoanApplications
);
router.post("/gbl", authenticateToken, createGintongButilLoanApplication);
router.get("/gbl/:id", authenticateToken, getGintongButilLoanApplication);
router.patch("/gbl/:id", authenticateToken, updateGintongButilLoanApplication);

module.exports = router;
