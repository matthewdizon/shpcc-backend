const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  imageUrl: { type: String },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: String,
  passwordResetToken: { type: String, default: null },
  passwordResetExpires: { type: Date, default: null },
  status: {
    type: String,
    enum: ["unverified", "verified"],
    default: "unverified",
  },
  verificationToken: {
    type: String,
    unique: true,
  },
  accountCreatedDate: { type: String },
  dateVerified: { type: String },
  isAdmin: {
    type: Boolean,
    default: false,
  },

  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  membershipType: {
    type: String,
    enum: ["none", "Regular", "Associate"],
    default: "none",
  },
  associateAccountNumber: { type: String },
  regularAccountNumber: { type: String },
  department: {
    type: String,
    enum: ["none", "Loans", "Memberships"],
    default: "none",
  },

  // updates from associate application
  contactNumber: { type: String, default: "" },
  address: { type: String, default: "" },
  facebookName: { type: String, default: "" },

  // link all loans made by user (add array for loans)
  gintongButilLoanApplications: { type: [String] },
  regularLoanApplications: { type: [String] },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
