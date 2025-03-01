const {UserText,User} = require("../Models/UserModel");
const mongoose = require('mongoose'); 


module.exports.TextDeleteApi = async (req, res, next) => {
  try {  

    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const userText = await UserText.findByIdAndDelete(id)

    // console.log(userText,"userTextsGet")
    
    if(!userText){
     return res.json({message:"User Not Found"})
    }

    res.status(200).json({success: true,message: "User Input Delete successfully",data:userText});

  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
  }