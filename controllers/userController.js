const User = require("../models/usersModel");
const {
  GintongButilLoanApplication,
  RegularLoanApplication,
} = require("../models/loansModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const nodemailer = require("nodemailer");
const {
  AssociateApplication,
  RegularApplication,
} = require("../models/membersModel");

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

    try {
      // generate salt to hash password
      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      const hashedPassword = await bcrypt.hash(password, salt);

      const token = CryptoJS.lib.WordArray.random(16).toString();

      const user = new User({
        email: email,
        password: hashedPassword,
        status: "unverified",
        verificationToken: token,
        accountCreatedDate: new Date(),
      });

      await user.save();

      // Send verification email
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

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res
            .status(500)
            .json({ message: "Unable to send verification email" });
        }

        console.log(`Email sent to ${email}: ${info.response}`);
        res.status(200).send({ user });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error Creating Account");
    }
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user) {
    const {
      firstName,
      lastName,
      isAdmin,
      membershipType,
      status,
      department,
      associateAccountNumber,
      regularAccountNumber,
    } = user;
    const payload = {
      email,
      firstName,
      lastName,
      isAdmin,
      membershipType,
      status,
      department,
      associateAccountNumber,
      regularAccountNumber,
    };
    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3d",
      });
      res.json({
        accessToken,
        firstName,
        lastName,
        isAdmin,
        membershipType,
        status,
        department,
        associateAccountNumber,
        regularAccountNumber,
      });
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
  const { associateAccountNumber, regularAccountNumber } = req.body;

  const user = await User.findOneAndUpdate(
    { email: email },
    {
      ...req.body,
    }
  );

  if (associateAccountNumber === "") {
    await User.findOneAndUpdate(
      { email: email },
      {
        membershipType: "none",
      }
    );
    await AssociateApplication.findOneAndUpdate(
      { user: email },
      {
        accountNumber: associateAccountNumber,
      }
    );
  }

  if (regularAccountNumber === "") {
    await RegularApplication.findOneAndUpdate(
      { user: email },
      {
        accountNumber: regularAccountNumber,
      }
    );
  }

  if (associateAccountNumber !== "") {
    await User.findOneAndUpdate(
      { email: email },
      {
        membershipType: "Associate",
      }
    );
    await AssociateApplication.findOneAndUpdate(
      { user: email },
      {
        accountNumber: associateAccountNumber,
      }
    );
  }

  if (regularAccountNumber !== "") {
    await User.findOneAndUpdate(
      { email: email },
      {
        membershipType: "Regular",
      }
    );
    await RegularApplication.findOneAndUpdate(
      { user: email },
      {
        accountNumber: regularAccountNumber,
      }
    );
  }

  return res.status(200).json(user);
};

const updateUserPassword = async (req, res) => {
  const { email } = req.params;
  const { oldPassword, newPassword } = req.body;

  if (!email || !oldPassword || !newPassword) {
    return res.status(422).send({
      error: "Old password and new password must be provided",
    });
  }

  // Find the user by email
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  // Check if the old password matches the hashed password in the database
  const isMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isMatch) {
    return res.status(401).send({ error: "Invalid password" });
  }

  // Generate salt to hash new password
  const salt = await bcrypt.genSalt(10);
  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Update the user's password
  user.password = hashedPassword;

  try {
    await user.save();
    res.status(200).send({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).send({ error });
  }
};

const requestForgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(422).send({
      error: "Email must be provided",
    });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Generate a unique token for the password reset link
    const token = CryptoJS.lib.WordArray.random(16).toString();

    // Set the token and expiry time in the user's document
    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + 3600000; // Token expires in 1 hour

    // Save the user's document with the updated token and expiry time
    await user.save();

    // Send an email to the user with a link to the password reset page
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

    const resetPasswordUrl = `${process.env.FRONTEND_CLIENT}/reset-password/?token=${token}`;

    const mailOptions = {
      from: `SHPCC ${process.env.NODEMAILER_EMAIL}`,
      to: email,
      subject: "Password reset request",
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
            <h1>Reset Your Password</h1>
            <p>You are receiving this email because you (or someone else) has requested a password reset for your account. Please click the following link or paste it into your browser to reset your password:</p>
            <a href=${resetPasswordUrl}>Reset Password</a>
            </body>
          </html>
          `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ error: "Email could not be sent" });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).send({ message: "Email sent successfully" });
      }
    });
  } catch (error) {
    res.status(400).send({ error });
  }
};

const resetUserPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(422).send({
      error: "Token and new password must be provided",
    });
  }

  try {
    // Find the user by the token
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(404)
        .send({ error: "Password reset link is invalid or has expired" });
    }

    // Generate salt to hash new password
    const salt = await bcrypt.genSalt(10);
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    res.status(200).send({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).send({ error });
  }
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
  updateUserPassword,
  requestForgotPassword,
  resetUserPassword,
};
