const User = require("../models/user");

const handleRegister = async (req, res) => {
  try {
    const body = req.body;
    if (!body) return res.status(400).send({ message: "invalid body" });
    const user = await User.create({
      username: body.username,
      password: body.password,
      fullName: body.fullName,
      email: body.email,
      gender: body.gender,
      DateOfBirth: body.DateOfBirth,
      country: body.country,
      role: body.role,
    });

    return res
      .status(201)
      .json({ status: "Created Successfully", userId: user._id, user });
    //return res.redirect("/user/signin");
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const handlelogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const uid = await User.matchPasswordandGenerateToken(email, password);

    res.cookie("uid", uid);
    //  res.render("home");
    return res.json({
      message: "login succesfully",
      "jwt token authentication ": "Done",
    });
  } catch (err) {
    //return res.redirect("/");
    return res.json({ message: err.message });
  }
};

const handlelogout = (req, res) => {
  res.clearCookie("uid").send("Logout successfuly");
};

const handleSearchByEmail = async (req, res) => {
  const email = req.params.email;
  if (!email) return res.json({ message: "Email is required" });
  const user = await User.findOne({ email: email });
  return res.json({ "User Details": user });
};
const handleSearchByUsername = async (req, res) => {
  const username = req.params.username;
  if (!username) return res.json({ message: "Username is required" });
  const user = await User.findOne({ username: username });
  return res.json({ "User Details": user });
};
const getallApiEndpoints = (req, res) => {
  return res.json({
    Instructions:
      "Please register and login first then run the web otherwise app is not running",
    message: "this is the api endpoints for checking the web app",
    "Register the user": "/register",
    "login the user": "/login",
    "create the resource": "/create",
    "get all resources": "/all",
    "get the resource by Id": "/byId/:id",
    "update the resource": "/update/:id",
    "Delete the resource": "/delete/:id",
    logout: "/logout",
  });
};
module.exports = {
  handleRegister,
  handlelogin,
  handlelogout,
  getallApiEndpoints,
  handleSearchByEmail,
  handleSearchByUsername,
};
