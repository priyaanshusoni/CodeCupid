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
      console.error("Error during loading feeds:", error);
      return res
        .status(500)
        .json({ message: "Server error. Please try again later." });
    }
  };


  module.exports = {
    feedController
  }