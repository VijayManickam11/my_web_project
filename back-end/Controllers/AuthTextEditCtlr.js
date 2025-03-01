const {UserText,User} = require("../Models/UserModel");
const mongoose = require('mongoose'); 


module.exports.TextEditApi = async (req, res, next) => {
  try {

    
    const { textInput } = req.body;
    
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const userText = await UserText.findByIdAndUpdate(id,{ inputText : textInput },{ new: true } )

    
    
    if(!userText){
     return res.json({message:"User Not Found"})
    }

    res.status(200).json({success: true,message: "User Input update successfully",data:userText});

  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
  }