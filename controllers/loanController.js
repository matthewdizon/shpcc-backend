const {
  GintongButilLoanApplication,
  RegularLoanApplication,
} = require("../models/loansModel");
const User = require("../models/usersModel");

const getGintongButilLoanApplications = async (req, res) => {
  const gintongButilLoanApplications = await GintongButilLoanApplication.find({
    isDraft: false,
  });

  res.status(200).json(gintongButilLoanApplications);
};

const getUserGintongButilLoanApplications = async (req, res) => {
  const { email } = req.params;
  const gintongButilLoanApplications = await GintongButilLoanApplication.find({
    user: email,
  });

  res.status(200).json(gintongButilLoanApplications);
};

const createGintongButilLoanApplication = async (req, res) => {
  const gintongButilLoanApplication = await GintongButilLoanApplication.create({
    ...req.body,
  });

  const test = await User.findOneAndUpdate(
    { email: gintongButilLoanApplication.user },
    { $push: { gintongButilLoanApplications: gintongButilLoanApplication._id } }
  );

  console.log(test);

  res.status(200).json(gintongButilLoanApplication);
};

const getGintongButilLoanApplication = async (req, res) => {
  const { id } = req.params;

  GintongButilLoanApplication.findOne(
    {
      _id: id,
    },
    function (err, obj) {
      res.status(200).json(obj);
    }
  );
};

const updateGintongButilLoanApplication = async (req, res) => {
  const { id } = req.params;

  const gintongButilLoanApplication =
    await GintongButilLoanApplication.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );

  return res.status(200).json(gintongButilLoanApplication);
};

module.exports = {
  getGintongButilLoanApplications,
  getUserGintongButilLoanApplications,
  createGintongButilLoanApplication,
  getGintongButilLoanApplication,
  updateGintongButilLoanApplication,
};
