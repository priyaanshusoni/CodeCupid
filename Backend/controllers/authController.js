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
    prompts,
  } = req.body;
  if (!firstName || !lastName || !email || !userName || !password) {
    return res.status(400).json({
      message: "Kindly fill all necessary details",
    });
  }
  let validationResult = UserSchema.safeParse(req.body);

  if (!validationResult.success)
    return res.status(400).json({
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
      prompts: prompts,
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

      res.cookie("token", token, {
        expires: new Date(Date.now() + 48 * 60 * 60 * 1000), //48 hrs
      }); // sending back token in cookie

      return res.json({ message: "login successfull" });
    }
  } catch (error) {
    console.error("Error during signin:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

const logoutController = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.json({
      message: "Logged out successfully !",
    });
  } catch (error) {
    console.error("Error during Logout:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

module.exports = {
  signupController,
  signinController,
  logoutController,
};
