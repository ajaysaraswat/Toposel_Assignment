const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");
const { setuser } = require("../services/auth");
const Joi = require("joi");
const { type } = require("node:os");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    DateOfBirth: {
      type: Date,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
    },

    salt: {
      type: String,
    },

    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  this.salt = salt;
  this.password = hashedPassword;

  next();
});

UserSchema.static(
  "matchPasswordandGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User dont found");
    const salt = user.salt;
    const hashedPassword = user.password;
    const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    if (hashedPassword !== userProvidedHash) throw new Error("User dont found");
    const token = setuser(user);

    return token;
  }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
