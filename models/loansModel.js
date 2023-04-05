const mongoose = require("mongoose");

const gintongButilLoanApplicationSchema = new mongoose.Schema({
  // General
  user: { type: String, required: true },
  isDraft: { type: Boolean },
  status: {
    type: String,
    enum: ["Approved", "Pending", "Rejected"],
    default: "Pending",
  },
  dateSubmitted: { type: String },

  // Admin General
  loanNumber: { type: String },
  voucherNumber: { type: String },
  bankAndCheckNumber: { type: String },
  approvedDate: { type: String },
  approvedAmount: { type: String },
  approvedBy: { type: String },
  adminMonthlyDue: { type: String },
  adminPaymentInterval: { type: String },
  adminDuration: { type: String },

  // Financial Information
  business: { type: String },
  companyName: { type: String },
  monthlyIncome: { type: String },
  spouseBusiness: { type: String },
  spouseCompanyName: { type: String },
  spouseMonthlyIncome: { type: String },

  // Loan Details
  date: { type: String },
  amount: { type: String },
  duration: { type: String },
  paymentInterval: { type: String },
  reason: { type: String },
});

const regularLoanApplicationSchema = new mongoose.Schema({
  // General
  user: { type: String, required: true },
  isDraft: { type: Boolean },
  status: {
    type: String,
    enum: ["Approved", "Pending", "Rejected"],
    default: "Pending",
  },
  dateSubmitted: { type: String },

  // Admin General
  loanNumber: { type: String },
  voucherNumber: { type: String },
  bankAndCheckNumber: { type: String },
  approvedDate: { type: String },
  approvedAmount: { type: String },
  approvedBy: { type: String },
  adminMonthlyDue: { type: String },
  adminPaymentInterval: { type: String },
  adminDuration: { type: String },

  // Financial Information
  business: { type: String },
  companyName: { type: String },
  monthlyIncome: { type: String },
  spouseBusiness: { type: String },
  spouseCompanyName: { type: String },
  spouseMonthlyIncome: { type: String },

  // Loan Details
  date: { type: String },
  amount: { type: String },
  duration: { type: String },
  paymentInterval: { type: String },
  remainingLoanBalance: { type: String },
  reason: { type: String },

  // Collateral Details
  collaterals: {
    type: [
      {
        gamitPanagot: { type: String },
        datePurchased: { type: String },
        collateralAmount: { type: String },
        serialNumber: { type: String },
      },
    ],
    default: [
      {
        gamitPanagot: "",
        datePurchased: "",
        collateralAmount: "",
        serialNumber: "",
      },
    ],
  },

  // Chattel Mortgage
  mortgages: {
    type: [
      {
        vehicle: { type: String },
        model: { type: String },
        motorNumber: { type: String },
      },
    ],
    default: [
      {
        vehicle: "",
        model: "",
        motorNumber: "",
      },
    ],
  },
});

const GintongButilLoanApplication = mongoose.model(
  "GintongButilLoanApplication",
  gintongButilLoanApplicationSchema
);

const RegularLoanApplication = mongoose.model(
  "RegularLoanApplication",
  regularLoanApplicationSchema
);

module.exports = {
  GintongButilLoanApplication,
  RegularLoanApplication,
};
