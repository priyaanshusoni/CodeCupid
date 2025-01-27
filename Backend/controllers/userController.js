const zod = require("zod");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user");
const { UserSchema } = require("../utils/SchemaValidation");
const bcrypt = require("bcrypt");
const {ConnectionRequestModel} = require("../models/connectionRequest")
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

const updateController = async (req, res) => {};




const requestController = async(req,res)=>{

  try{

    const userId = req.userid;

    const connectionRequests = await ConnectionRequestModel.find({
      toUserId : userId,
      status : "interested"
    })

    if(connectionRequests.length==0){
      return res.json({
        matches : "No likes yet !"
      })
    }



    return res.json({
      connectionRequests
    })

  }catch(error){
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again later." });

  }

}
module.exports = {
  updateController,
  feedController,
  requestController 
};
