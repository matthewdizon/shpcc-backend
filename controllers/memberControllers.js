const {
  AssociateApplication,
  RegularApplication,
} = require("../models/membersModel");

const getAssociateApplications = async (req, res) => {
  const associateApplications = await AssociateApplication.find({});

  res.status(200).json(associateApplications);
};

module.exports = {
  getAssociateApplications,
};
