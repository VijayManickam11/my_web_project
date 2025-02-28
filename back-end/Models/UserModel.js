const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    // required: [true, "Your email address is required"],
    unique: true,
    // sparse: true,
    trim: true,
    default: ""
  },
  username: {
    type: String,  
    // required: [true, "Your username is required"],
  },
  password: {
    type: String,
    // required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const userTextSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,    
    ref:"User"    
  }, 
  inputText: {
    type: String,
  // required: true,
  // trim: true,
  // lowercase: true,
 
  }, 
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("User", userSchema);

const UserText = mongoose.model("UserText", userTextSchema);


module.exports = {User,UserText};
