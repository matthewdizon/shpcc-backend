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

module.exports = {
  getAssociateApplications,
  createAssociateApplication,
  getAssociateApplication,
};
