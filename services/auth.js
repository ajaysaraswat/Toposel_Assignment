const jwt = require("jsonwebtoken");

const secret = "$123Toposel";

const setuser = (user) => {
  const payload = {
    email: user.email,
    role: user.role,
    _id: user.id,
  };
  return jwt.sign(payload, secret);
};

const getuser = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
};

module.exports = {
  setuser,
  getuser,
};
