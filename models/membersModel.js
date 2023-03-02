const mongoose = require("mongoose");

const associateApplicationSchema = new mongoose.Schema({
  // General
  user: { type: String, required: true },
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
  cellphone: { type: String },
  facebookName: { type: String },
  viberMessenger: { type: String },

  religion: { type: String },
  educationalAttainment: { type: String },
  inTrustFor: { type: String },

  // Company Information

  // Account Information

  // Beneficiaries/Dependents

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
