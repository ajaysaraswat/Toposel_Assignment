const express = require("express");
const {
  handleRegister,
  handlelogout,
  handlelogin,
  getallApiEndpoints,
  handleSearchByEmail,
  handleSearchByUsername,
} = require("../controllers/user");
const { validateUser } = require("../middlewares/validateSchema");

const userRouter = express.Router();

userRouter.get("/", getallApiEndpoints);
userRouter.post("/register", validateUser, handleRegister);
userRouter.post("/login", handlelogin);
userRouter.post("/logout", handlelogout);
userRouter.get("/searchbyemail/:email", handleSearchByEmail);
userRouter.get("/searchbyusername/:username", handleSearchByUsername);

module.exports = userRouter;
