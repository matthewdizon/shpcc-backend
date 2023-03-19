const {
  AssociateApplication,
  RegularApplication,
} = require("../models/membersModel");
const User = require("../models/usersModel");

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
    const { firstName, lastName, contactNumber, address, facebookName } =
      associateApplication;
    await User.findOneAndUpdate(
      { email: email },
      {
        firstName,
        lastName,
        contactNumber,
        address,
        facebookName,
        membershipType: "Associate",
      }
    );
  }

  return res.status(200).json(associateApplication);
};

module.exports = {
  getAssociateApplications,
  createAssociateApplication,
  getAssociateApplication,
  updateAssociateApplication,
};
