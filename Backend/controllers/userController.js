const zod = require("zod");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user");
const { UserSchema } = require("../utils/SchemaValidation");
const bcrypt = require("bcrypt");
require("dotenv").config();


const feedController = async (req, res) => {
  try {
    const users = await UserModel.find({});

    if (users.length == 0)
      return res.status(500).json({ message: "no profiles to show" });

    return res.json({ users });
  } catch (error) {
    console.error("Error during signup:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};
const userprofileController = async (req, res) => {
  
  try {
    const user = await UserModel.findOne({
      _id : req.userid
    });

    if (!user) {
      return res.status(400).json({ message: "Sign in Please !" });
    }

    console.log("Cookies : " , req.cookies);
    
    return res.json({
      user,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};
const updateController = async (req, res) => {};
const pathupdateController = async (req, res) => {
  const { email, ...updateddata } = req.body;

  // I don't want user to allow to update email id's once registered

  if (!email) {
    // remove email check after auth middleware coz this route restricts email update
    return res.status(400).json({
      message: "Kindly fill all necessary details",
    });
  }

  try {
    const ALLOWED_UPDATES = [
      "photoUrl",
      "bio",
      "gender",
      "age",
      "skills",
      "firstName",
      "lastName",
      "password",
      "userName",
      "email",
    ];

    //Convering keys from req.body to an array using Object.keys() then applying every function on that array to check it only has allowed updates fields so that user if sends any
    //random field to update we return back a error message also email is not updated through this code .

    const isupdateAllowed = Object.keys(updateddata).every((x) =>
      ALLOWED_UPDATES.includes(x)
    );
    if (!isupdateAllowed)
      return res.status(400).json({ message: "Update not allowed" });

    const user = await UserModel.findOneAndUpdate(
      {
        email: email,
      },
      {
        $set: updateddata,
      }
    );

    if (!user) return res.status(400).json({ message: "No user found " });

    return res.json({ message: "Updation of user data is successfull", user });
  } catch (error) {
    console.error("Error while updation" + error);
    return res.json({ "UPDATE FAILED ": error.message });
  }
};
const deleteController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "kindly fill all the required fields" });

  try {
    const user = await UserModel.findOneAndDelete({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "no user exists with this email" });
    }

    return res.json({ message: "Account deletion succesfull", user });
  } catch (error) {
    console.error("Error during account deletion:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};




module.exports = {
 
  updateController,
  pathupdateController,
  feedController,
  deleteController,
  userprofileController,
 
  
};
