const {
  GintongButilLoanApplication,
  RegularLoanApplication,
} = require("../models/loansModel");

const getGintongButilLoanApplications = async (req, res) => {
  const gintongButilLoanApplications = await GintongButilLoanApplication.find({
    isDraft: false,
  });

  res.status(200).json(gintongButilLoanApplications);
};

const createGintongButilLoanApplication = async (req, res) => {
  const gintongButilLoanApplication = await GintongButilLoanApplication.create({
    ...req.body,
  });

  res.status(200).json(gintongButilLoanApplication);
};

const getGintongButilLoanApplication = async (req, res) => {
  const { email } = req.params;

  GintongButilLoanApplication.findOne(
    {
      user: email,
    },
    function (err, obj) {
      res.status(200).json(obj);
    }
  );
};

const updateGintongButilLoanApplication = async (req, res) => {
  const { email } = req.params;

  const gintongButilLoanApplication =
    await GintongButilLoanApplication.findOneAndUpdate(
      { user: email },
      {
        ...req.body,
      }
    );

  return res.status(200).json(gintongButilLoanApplication);
};

module.exports = {
  getGintongButilLoanApplications,
  createGintongButilLoanApplication,
  getGintongButilLoanApplication,
  updateGintongButilLoanApplication,
};
