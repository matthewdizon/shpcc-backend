const express = require("express");
const {
  getGintongButilLoanApplications,
  createGintongButilLoanApplication,
  getGintongButilLoanApplication,
  updateGintongButilLoanApplication,
  getUserGintongButilLoanApplications,
  getRegularLoanApplications,
  getUserRegularLoanApplications,
  createRegularLoanApplication,
  getRegularLoanApplication,
  updateRegularLoanApplication,
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

router.get("/regular", authenticateToken, getRegularLoanApplications);
router.get(
  "/regular/history/:email",
  authenticateToken,
  getUserRegularLoanApplications
);
router.post("/regular", authenticateToken, createRegularLoanApplication);
router.get("/regular/:id", authenticateToken, getRegularLoanApplication);
router.patch("/regular/:id", authenticateToken, updateRegularLoanApplication);

module.exports = router;
