const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: String,
  status: {
    type: String,
    enum: ["unverified", "verified"],
    default: "unverified",
  },
  verificationToken: {
    type: String,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  membershipType: {
    type: String,
    enum: ["none", "regular", "associate"],
    default: "none",
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
