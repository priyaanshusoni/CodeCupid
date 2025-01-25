const mongoose = require("mongoose");
const { retry } = require("statuses");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;
const validator = require("validator");
require("dotenv").config();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, minLength: 2, maxLength: 50 },

    lastName: { type: String },
    userName: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email " + value);
        }
      },
    },

    password: { type: String, required: true },
    age: { type: Number, min: 18 },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Other",
    },

    photoUrl: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/05/49/98/39/240_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid image URL " + value);
        }
      },
    },

    bio: {
      type: String,
      default: "Hey there ! I am using CodeCupid",
    },
    skills: {
      type: [String],
    },

    prompts: [String],

    experience: [
      {
        company: String,
        role: String,
        years: String,
      },
    ],
    Location: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = function(){

  const user = this;
 const token = jwt.sign(
        {
          userid: user._id,
        },
        process.env.JWT_SECRET,{
          expiresIn : "2d"
        }
      );

      return token;
}
userSchema.methods.validatePassword = async  function(userPassword){

  const user = this;

  const isPasswordMatch = await bcrypt.compare(userPassword , user.password);
  

  return isPasswordMatch;
 
}

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
