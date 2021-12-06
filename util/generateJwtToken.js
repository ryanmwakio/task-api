const jwt = require("jsonwebtoken");

const generateJwtToken = (userId) => {
  const token = jwt.sign({ _id: userId }, process.env.JWT_IDENTIFIER, {
    expiresIn: "7 days",
  });
  return token;
};

module.exports = generateJwtToken;
