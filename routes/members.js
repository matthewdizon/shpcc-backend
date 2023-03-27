const express = require("express");
const {
  getAssociateApplications,
  createAssociateApplication,
  getAssociateApplication,
  updateAssociateApplication,
  getRegularApplications,
  createRegularApplication,
  getRegularApplication,
  updateRegularApplication,
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

router.get("/regular", authenticateToken, getRegularApplications);
router.post("/regular", authenticateToken, createRegularApplication);
router.get("/regular/:email", authenticateToken, getRegularApplication);
router.patch("/regular/:email", authenticateToken, updateRegularApplication);

module.exports = router;
