require("dotenv").config();
const jwt = require("jsonwebtoken");

// module.exports.createSecretToken = (id) => {
//   return jwt.sign({ id }, process.env.TOKEN_KEY, {
//     expiresIn: 3 * 24 * 60 * 60,
//   });
// };

module.exports.createSecretToken = (id) => {
    const token = jwt.sign(
      { id},
      process.env.SECRET_KEY || "defaultsecretkey", // Secret key தரப்பட்டது
      { expiresIn: "1h" }
    );
    return token;
  };