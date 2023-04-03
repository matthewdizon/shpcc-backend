const mongoose = require("mongoose");

const associateApplicationSchema = new mongoose.Schema({
  // General
  user: { type: String, required: true, unique: true },
  isDraft: { type: Boolean },
  status: {
    type: String,
    enum: ["Approved", "Pending", "Rejected"],
    default: "Pending",
  },
  dateSubmitted: { type: String },

  // Admin General
  accountNumber: { type: String },
  codeNumber: { type: String },
  orNumber: { type: String },
  initialDeposit: { type: String },
  authenticatedBy: { type: String },
  brNumber: { type: String },
  approvedBy: { type: String },
  approvedDate: { type: String },

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
  // ##### General
  user: { type: String, required: true, unique: true },
  isDraft: { type: Boolean },
  status: {
    type: String,
    enum: ["Approved", "Pending", "Rejected"],
    default: "Pending",
  },
  dateSubmitted: { type: String },

  // ##### Admin General
  // ---pmesAttendance
  pmesAttendanceAuthenticatedBy: { type: String },
  pmesAttendanceAuthenticatedDate: { type: String },

  // ---backgroundInvestigation
  backgroundInvestigationAuthenticatedBy: { type: String },
  backgroundInvestigationAuthenticatedDate: { type: String },

  // ---settledFees
  commonShare: { type: String },
  preferredShare: { type: String },
  savingsDeposit: { type: String },
  membershipFee: { type: String },
  seminarFee: { type: String },
  damayan: { type: String },
  gyrt: { type: String },

  // ---accountInfo
  // accountNumber ??
  orNumber: { type: String },
  dateEncoded: { type: String },
  encodedBy: { type: String },

  // ---boardResolution
  boardResolutionNumber: { type: String },
  boardDateEncoded: { type: String },
  approvedBy: { type: String },
  approvedDate: { type: String },

  // ##### Personal Information
  lastName: { type: String },
  firstName: { type: String },
  middleName: { type: String },
  suffix: { type: String },
  nickname: { type: String },
  gender: { type: String },
  civilStatus: { type: String },
  associateAccountNumber: { type: String },

  // ---current residence
  houseNumber: { type: String },
  street: { type: String },
  barangay: { type: String },
  city: { type: String },
  zipCode: { type: String },

  // ---province?
  // houseNumber*
  // street*
  // barangay
  // city
  // zipCode*

  dateOfBirth: { type: String },
  placeOfBirth: { type: String },
  religion: { type: String },
  educationalAttainment: { type: String },
  undergraduateDegree: { type: String },
  yearGraduated: { type: String },
  schoolName: { type: String },
  schoolAddress: { type: String },
  contactNumber: { type: String },
  emailAddress: { type: String },
  facebookName: { type: String },

  // ---type of residence
  residenceType: { type: String },
  yearsInResidence: { type: String },
  residenceOwnerName: { type: String },
  residenceAddress: { type: String },

  // ##### Family Information
  // ---spouse's information
  spouseLastName: { type: String },
  spouseFirstName: { type: String },
  spouseMiddleName: { type: String },
  spouseSuffix: { type: String },
  spouseContactNumber: { type: String },
  spouseTin: { type: String },
  spousePensioner: { type: String },
  spouseSss: { type: String },
  spouseGsis: { type: String },
  spouseEmploymentType: { type: String },
  // (employee)
  spouseIsEmployee: { type: Boolean },
  spouseCompanyName: { type: String },
  spouseCompanyAddress: { type: String },
  spouseCompanyContactNumber: { type: String },
  // (business)
  spouseIsBusinessOwner: { type: Boolean },
  spouseBusinessType: { type: String },
  spouseBusinessName: { type: String },
  spouseBusinessLocation: { type: String },
  // (ofw)
  spouseOfwCompanyName: { type: String },
  spouseOfwCompanyAddress: { type: String },

  // ---dependentsAndBeneficiaries
  children: {
    type: [
      {
        childFullName: { type: String },
        childDateOfBirth: { type: String },
        childContactNumber: { type: String },
      },
    ],
    default: [
      { childFullName: "", childDateOfBirth: "", childContactNumber: "" },
    ],
  },
  otherRelatives: {
    type: [
      {
        relativeFullName: { type: String },
        relativeRelationship: { type: String },
        relativeContactNumber: { type: String },
      },
    ],
    default: [
      {
        relativeFullName: "",
        relativeRelationship: "",
        relativeContactNumber: "",
      },
    ],
  },

  // ##### Employment Details
  pensioner: { type: String },
  sss: { type: String },
  gsis: { type: String },
  employmentType: { type: String },
  // (employee)
  isEmployee: { type: Boolean },
  companyName: { type: String },
  companyAddress: { type: String },
  companyContactNumber: { type: String },
  // (business)
  isBusinessOwner: { type: Boolean },
  businessType: { type: String },
  businessName: { type: String },
  businessLocation: { type: String },
  // (ofw)
  ofwCompanyName: { type: String },
  ofwCompanyAddress: { type: String },

  // ##### Family and Business Income
  monthlySalary: { type: Number },
  businessIncome: { type: Number },
  otherIncomeSource: { type: Number },
  spouseMonthlySalary: { type: Number },
  spouseBusinessIncome: { type: Number },
  spouseOtherIncomeSource: { type: Number },
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
