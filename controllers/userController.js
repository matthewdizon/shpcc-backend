const User = require("../models/usersModel");
const {
  GintongButilLoanApplication,
  RegularLoanApplication,
} = require("../models/loansModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const nodemailer = require("nodemailer");

async function sendVerificationEmail(email, token) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: `${process.env.NODEMAILER_EMAIL}`,
        pass: `${process.env.NODEMAILER_PASSWORD}`,
      },
    });

    const verificationUrl = `${process.env.BACKEND_SERVER}/api/users/verifyEmail?token=${token}`;

    const mailOptions = {
      from: `SHPCC ${process.env.NODEMAILER_EMAIL}`,
      to: email,
      subject: "Verify your email",
      html: `
      <html>
<head>
<style type="text/css">
/* Add styles here */
body {
font-family: Arial, sans-serif;
padding: 20px;
}
h1 {
font-size: 20px;
text-align: center;
color: #333;
}
p {
font-size: 16px;
line-height: 1.5;
text-align: center;
color: #333;
margin-top: 20px;
}
a {
display: block;
font-size: 16px;
background-color: #E74C3C;
color: #FFF;
padding: 15px 20px;
text-align: center;
text-decoration: none;
border-radius: 5px;
margin-top: 20px;
}
</style>
</head>
<body>
<h1>Verify Your Email</h1>
<p>A verification link has been sent to your email. Please check your inbox and follow the instructions to verify your account and start using our app.</p>
<a href=${verificationUrl}>Verify Email</a>
</body>
</html>
    
`,
    };

    return await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(error);
  }
}

const createUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "Email and password must be provided" });
  }

  User.findOne({ email: email }, async function (err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: "Email is already in use..." });
    }

    const token = CryptoJS.lib.WordArray.random(16).toString();

    const user = new User({
      email: email,
      password: password,
      status: "unverified",
      verificationToken: token,
      accountCreatedDate: new Date(),
    });

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);

    user
      .save()
      .then(() => {
        User.findOneAndUpdate({ email }, { new: true })
          .then(() => {
            sendVerificationEmail(email, token);
            res.status(200).send({ user });
          })
          .catch((error) => res.status(400).send({ error }));
      })
      .catch((error) => res.status(400).send({ error }));
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    const { firstName, lastName, isAdmin, membershipType, status } = user;
    const payload = {
      email,
      firstName,
      lastName,
      isAdmin,
      membershipType,
      status,
    };
    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3d",
      });
      res.json({ accessToken, firstName, lastName, isAdmin, membershipType });
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
};

const identifyUser = async (req, res) => {
  // Get the access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  // Verify the access token using the secret that was used to sign it
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      // If the token is invalid or has been tampered with, return an error
      res.status(401).send({ error: "Invalid token" });
      return;
    }

    // Extract the user's email address from the decoded payload
    const user = decoded;

    // Send the email address to the frontend
    res.send({ user });
  });
};

const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).send({ error: "Invalid token" });
    }

    user.status = "verified";
    user.dateVerified = new Date();
    await user.save();

    res.redirect(`${process.env.FRONTEND_CLIENT}/verificationSuccessful`);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

async function resendVerificationLink(req, res) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    if (user.status === "verified") {
      return res
        .status(400)
        .send({ error: "This email has already been verified" });
    }

    const verificationUrl = `${process.env.BACKEND_SERVER}/api/users/verifyEmail?token=${user.verificationToken}`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: `${process.env.NODEMAILER_EMAIL}`,
        pass: `${process.env.NODEMAILER_PASSWORD}`,
      },
    });

    const mailOptions = {
      from: `SHPCC ${process.env.NODEMAILER_EMAIL}`,
      to: email,
      subject: "Verify your email",
      html: `
      <html>
<head>
<style type="text/css">
/* Add styles here */
body {
font-family: Arial, sans-serif;
padding: 20px;
}
h1 {
font-size: 20px;
text-align: center;
color: #333;
}
p {
font-size: 16px;
line-height: 1.5;
text-align: center;
color: #333;
margin-top: 20px;
}
a {
display: block;
font-size: 16px;
background-color: #E74C3C;
color: #FFF;
padding: 15px 20px;
text-align: center;
text-decoration: none;
border-radius: 5px;
margin-top: 20px;
}
</style>
</head>
<body>
<h1>Verify Your Email</h1>
<p>A verification link has been sent to your email. Please check your inbox and follow the instructions to verify your account and start using our app.</p>
<a href=${verificationUrl}>Verify Email</a>
</body>
</html>
    
`,
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .send({ message: "Email verification link has been resent." });
  } catch (error) {
    throw new Error(error);
  }
}

const getUsers = async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
};

const getUser = async (req, res) => {
  const { email } = req.params;

  const user = await User.find({ email: email }).populate([
    {
      path: "gintongButilLoanApplications",
      model: GintongButilLoanApplication,
    },
    { path: "regularLoanApplications", model: RegularLoanApplication },
  ]);

  res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { email } = req.params;

  const user = await User.findOneAndUpdate(
    { email: email },
    {
      ...req.body,
    }
  );

  return res.status(200).json(user);
};

module.exports = {
  createUser,
  loginUser,
  identifyUser,
  verifyEmail,
  resendVerificationLink,
  getUsers,
  getUser,
  updateUser,
};
