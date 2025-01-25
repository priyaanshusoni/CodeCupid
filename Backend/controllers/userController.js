const zod = require("zod");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user");
const { UserSchema } = require("../utils/SchemaValidation");
const bcrypt = require("bcrypt");
require("dotenv").config();
const signupController = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    userName,
    password,
    skills,
    gender,
    photoUrl,
    experience,
  } = req.body;
  if (!firstName || !lastName || !email || !userName || !password) {
    return res.status(400).json({
      message: "Kindly fill all necessary details",
    });
  }
  let validationResult = UserSchema.safeParse(req.body);

  if (!validationResult.success)
    return res
      .status(400)
      .json({
        message: "Validation failed",
        error: validationResult.error.errors,
      });

  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "email already registred , try different one" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      password: hashedPassword,
      email: email,
      skills: skills,
      gender: gender,
      photoUrl: photoUrl,
      experience: experience,
    });

    return res.status(201).json({
      message: "Signing up successfull ",
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({
      message: "Server error, Please try again later " + error.message,
    });
  }
};

const signinController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Kindly fill all the required fields" });

  try {
    const user = await UserModel.findOne({ email: email });

    if (!user)
      return res
        .status(400)
        .json({ message: "No user found , sign up instead" });

    const isPasswordMatch = await user.validatePassword(password);

    if (!isPasswordMatch)
      return res.status(400).json({
        message: "Invalid Password",
      });
    // Creating a token for the user
    else {
       const token = await user.getJWT(); // Schema methods

      res.cookie("token" , token, {
        expires: new Date(Date.now() + 48 *60*60*1000)//48 hrs
      }) // sending back token in cookie

      return res.json({ message: "login successfull" });
    }
  } catch (error) {
    console.error("Error during signin:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};
const allprofileController = async (req, res) => {
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


const logoutController = async(req,res)=>{
    
  try{

    res.clearCookie("token");

    return res.json({
      message : "Logged out successfully !"
    })

  }catch(error){
    console.error("Error during Logout:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });

  }
}


const connectionRequestController = async(req,res)=>{

}

module.exports = {
  signupController,
  signinController,
  updateController,
  pathupdateController,
  allprofileController,
  deleteController,
  userprofileController,
  logoutController,
  connectionRequestController
};
