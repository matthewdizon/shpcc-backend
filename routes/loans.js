const express = require("express");
const {
  getGintongButilLoanApplications,
  createGintongButilLoanApplication,
  getGintongButilLoanApplication,
  updateGintongButilLoanApplication,
} = require("../controllers/loanController");

const { authenticateToken } = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/gbl", authenticateToken, getGintongButilLoanApplications);
router.post("/gbl", authenticateToken, createGintongButilLoanApplication);
router.get("/gbl/:email", authenticateToken, getGintongButilLoanApplication);
router.patch(
  "/gbl/:email",
  authenticateToken,
  updateGintongButilLoanApplication
);

module.exports = router;
