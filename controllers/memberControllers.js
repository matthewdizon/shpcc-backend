const {
  AssociateApplication,
  RegularApplication,
} = require("../models/membersModel");
const User = require("../models/usersModel");

// Associate Membership Application

const getAssociateApplications = async (req, res) => {
  const associateApplications = await AssociateApplication.find({
    isDraft: false,
  });

  res.status(200).json(associateApplications);
};

const createAssociateApplication = async (req, res) => {
  const associateApplication = await AssociateApplication.create({
    ...req.body,
  });

  res.status(200).json(associateApplication);
};

const getAssociateApplication = async (req, res) => {
  const { email } = req.params;

  AssociateApplication.findOne(
    {
      user: email,
    },
    function (err, obj) {
      res.status(200).json(obj);
    }
  );
};

const updateAssociateApplication = async (req, res) => {
  const { email } = req.params;
  const { status } = req.body;

  const associateApplication = await AssociateApplication.findOneAndUpdate(
    { user: email },
    {
      ...req.body,
    }
  );

  if (status === "Approved") {
    // if body includes a status with "Approved" update the user model
    // updating the ff things: membership type, contact number, first and last name, etc
    const {
      firstName,
      lastName,
      contactNumber,
      address,
      facebookName,
      accountNumber,
    } = associateApplication;
    console.log("HERE", associateApplication);
    await User.findOneAndUpdate(
      { email: email },
      {
        firstName,
        lastName,
        contactNumber,
        address,
        facebookName,
        associateAccountNumber: accountNumber,
        membershipType: "Associate",
      }
    );
  }

  return res.status(200).json(associateApplication);
};

// Regular Membership Application

const getRegularApplications = async (req, res) => {
  const regularApplications = await RegularApplication.find({
    isDraft: false,
  });

  res.status(200).json(regularApplications);
};

const createRegularApplication = async (req, res) => {
  const regularApplication = await RegularApplication.create({
    ...req.body,
  });

  res.status(200).json(regularApplication);
};

const getRegularApplication = async (req, res) => {
  const { email } = req.params;

  RegularApplication.findOne(
    {
      user: email,
    },
    function (err, obj) {
      res.status(200).json(obj);
    }
  );
};

const updateRegularApplication = async (req, res) => {
  const { email } = req.params;
  const { status } = req.body;

  const regularApplication = await RegularApplication.findOneAndUpdate(
    { user: email },
    {
      ...req.body,
    }
  );

  if (status === "Approved") {
    // if body includes a status with "Approved" update the user model
    // updating the ff things: membership type, contact number, first and last name, etc
    const {
      firstName,
      lastName,
      contactNumber,
      address,
      facebookName,
      accountNumber,
    } = regularApplication;
    await User.findOneAndUpdate(
      { email: email },
      {
        firstName,
        lastName,
        contactNumber,
        address,
        facebookName,
        regularAccountNumber: accountNumber,
        membershipType: "Regular",
      }
    );
  }

  return res.status(200).json(regularApplication);
};

module.exports = {
  getAssociateApplications,
  createAssociateApplication,
  getAssociateApplication,
  updateAssociateApplication,
  getRegularApplications,
  createRegularApplication,
  getRegularApplication,
  updateRegularApplication,
};
