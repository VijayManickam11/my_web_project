const {UserText,User} = require("../Models/UserModel");
const mongoose = require('mongoose'); 


module.exports.TextGetApi = async (req, res, next) => {
  try {

    // console.log(req.params.id,"getTheReq")

    const userText = await UserText.find({user:new mongoose.Types.ObjectId(req.params.id)})

    console.log(userText,"userTextsGet")
    
    if(!userText){
     return res.json({message:"User Not Found"})
    }

    res.status(200).json({success: true,message: "User Input get successfully",data:userText});

  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
  }