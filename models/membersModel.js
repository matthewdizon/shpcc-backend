const mongoose = require("mongoose");

const associateApplicationSchema = new mongoose.Schema({
  // General
  user: { type: String, required: true, unique: true },
  isDraft: { type: Boolean },

  // Personal Information
  lastName: { type: String },
  firstName: { type: String },
  middleName: { type: String },
  suffix: { type: String },
  maidenName: { type: String },

  address: { type: String },
  dateOfBirth: { type: String },
  age: { type: String },
  placeOfBirth: { type: String },

  gender: { type: String },
  civilStatus: { type: String },
  contactNumber: { type: String },
  facebookName: { type: String },
  viberMessenger: { type: String },

  religion: { type: String },
  educationalAttainment: { type: String },
  inTrustFor: { type: String },

  // Company Information
  business: { type: String },
  companyName: { type: String },
  companyAddress: { type: String },
  companyIdNumber: { type: String },
  companyIdValidUntil: { type: String },

  // Account Information
  accountType: { type: String },
  monthlyIncome: { type: String },
  sssGsisNumber: { type: String },
  tinNumber: { type: String },
  barangay: { type: String },
  voterId: { type: String },
  idType: { type: String },
  idNumber: { type: String },
  idValidUntil: { type: String },
  otherSourcesOfIncome: {
    type: [
      {
        source: { type: String },
        amountPerMonth: { type: String },
      },
    ],
    default: [
      {
        source: "",
        amountPerMonth: "",
      },
    ],
  },

  // Beneficiaries/Dependents
  beneficiaries: {
    type: [
      {
        fullName: { type: String },
        address: { type: String },
        relationship: { type: String },
        age: { type: String },
        dateOfBirth: { type: String },
      },
    ],
    default: [
      {
        fullName: "",
        address: "",
        relationship: "",
        age: "",
        dateOfBirth: "",
      },
    ],
  },
  shpccFamilyMembers: {
    type: [
      {
        name: { type: String },
      },
    ],
    default: [
      {
        name: "",
      },
    ],
  },

  // Attachments
});

const regularApplicationSchema = new mongoose.Schema({
  lastName: { type: String },
  firstName: { type: String },
  middleName: { type: String },
  suffix: { type: String },
  nickname: { type: String },
  associateAccountNumber: { type: String },
  address: { type: String },
  telephone: { type: String },
  cellphone: { type: String },
  facebookName: { type: String },
  dateOfBirth: { type: String },
  placeOfBirth: { type: String },
  civilStatus: { type: String },
  gender: { type: String },
  religion: { type: String },
  educationalAttainment: { type: String },
});

const AssociateApplication = mongoose.model(
  "AssociateApplication",
  associateApplicationSchema
);

const RegularApplication = mongoose.model(
  "RegularApplication",
  regularApplicationSchema
);

module.exports = {
  AssociateApplication,
  RegularApplication,
};
