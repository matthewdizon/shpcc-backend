const mongoose = require("mongoose");

const associateApplicationSchema = new mongoose.Schema({
  lastName: { type: String },
  firstName: { type: String },
  middleName: { type: String },
  suffix: { type: String },
  inTrustFor: { type: String },
  accountType: { type: String },
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
