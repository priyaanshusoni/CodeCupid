const zod = require("zod");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user");
const { UserSchema } = require("../utils/SchemaValidation");
const bcrypt = require("bcrypt");
const { ConnectionRequestModel } = require("../models/connectionRequest");
require("dotenv").config();

const feedController = async (req, res) => {
  //There's a bug issue in this API , which is that I should not get my own profile in the feed.
  // So filter out profiles excluding my own profile and after then I'll send the request/feed
  try {
    const users = await UserModel.find({ _id: { $ne: req.userid } }).select(
      "-password  -email"
    ); //bug fixed
    //the .select("-field1  -field2") excludes the two fields and includes other fileds to send from the DB so in this API I want to exclude user password & user email to be
    //sent

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

const requestController = async (req, res) => {
  try {
    const userId = req.userid;

    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: userId,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "userName",
      "skills",
      "experience",
      "bio",
      "gender",
      "photoUrl",
    ]);

    if (connectionRequests.length == 0) {
      return res.json({
        matches: "No likes yet !",
      });
    }

    return res.json({
      connectionRequests,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
}; // get all the pending connection requests for the user

const connectionController = async (req, res) => {
  try {
    const connections = await ConnectionRequestModel.find({
      $or: [{ toUserId: req.userid }, { fromUserId: req.userid }],
      status: "accepted",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "userName",
      "skills",
      "experience",
      "bio",
      "gender",
      "photoUrl",
    ]);

    if (connections.length == 0) {
      return res.status(500).json({
        message: "No matches yet!",
      });
    }

    const data = connections.map((x) => x.fromUserId);

    return res.json({
      data,
    });
  } catch (error) {
    console.error("Error during loading connections:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};
module.exports = {
  updateController,
  feedController,
  requestController,
  connectionController,
};
