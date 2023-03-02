const {
  AssociateApplication,
  RegularApplication,
} = require("../models/membersModel");

const getAssociateApplications = async (req, res) => {
  const associateApplications = await AssociateApplication.find({});

  res.status(200).json(associateApplications);
};

const createAssociateApplication = async (req, res) => {
  const associateApplication = await AssociateApplication.create({
    ...req.body,
  });

  res.status(200).json(associateApplication);
};

module.exports = {
  getAssociateApplications,
  createAssociateApplication,
};
