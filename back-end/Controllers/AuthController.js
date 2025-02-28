const {User} = require("../Models/UserModel");
const { createSecretToken } = require("../Util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res) => {
  try {
    // console.log("Wbcjfwbnjewi")
    const { email, password, username, createdAt } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    } 

    const user = await User.create({ email, password, username, createdAt });

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    return res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    // next();
    
  } catch (error) {
    console.error(error);
  }
};