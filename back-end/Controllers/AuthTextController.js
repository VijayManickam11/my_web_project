const {User,UserText} = require("../Models/UserModel");
const { createSecretToken } = require("../Util/SecretToken");
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose'); 

module.exports.InputText = async (req, res) => {
  try {
    
    
    const { sendTheData } = req.body;

    
    let inputText = sendTheData?.textInput;

    console.log(inputText,"inputText")
    
    // let user_id = new mongoose.Types.ObjectId(sendTheData.UserID);
   
    if (!inputText || inputText.trim() === "") {
      return res.status(400).json({ error: "Input text is required" });
    }
    
    const user = await User.findOne({ _id: sendTheData.UserID }).lean();

    
    if (!user) {
      return res.json({ message: "User not found" });
    } 

    const userText = await UserText.create({
      user: user._id, // Reference the user
      inputText: inputText,
    });
    
    res.status(201).json({ message: "User Text Created successfully", success: true });
  } catch (err) {
    console.error("Error saving user text:", err);
  res.status(500).json({ error: "Failed to save user text", details: err });
  }
  

}
