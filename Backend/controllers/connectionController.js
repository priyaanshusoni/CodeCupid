const zod = require("zod");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user");
const { ConnectionRequestModel } = require("../models/connectionRequest");
const { UserSchema } = require("../utils/SchemaValidation");
const bcrypt = require("bcrypt");
require("dotenv").config();

const statusController = async (req, res) => {
  try {
    const fromUser = req.userid;

    const toUser = req.params.touserId;
    //    if(fromUser==toUser) return res.status(400).json({message : "You can't send connection request to yourself"})

    const status = req.params.status;

    //first checkpoint
    const user = await UserModel.findOne({
      _id: toUser,
    });

    if (!user)
      return res
        .status(404)
        .json({
          message: "You are sending connection request to a non valid user",
        });

    //second checkpoint

    if (!["interested", "ignored"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status type Request :" + status,
      });
    }

    //If there is an existing connectionRequest
    //Third checkpoint
    const existingconnectionRequest = await ConnectionRequestModel.findOne({
      $or: [
        //$or operator takes an array of conditions and returns true if one of those conditions met true
        {
          fromUserId: fromUser,
          toUserId: toUser,
        },
        {
          fromUserId: toUser,
          toUserId: fromUser,
        },
      ],
    });

    if (existingconnectionRequest)
      return res.status(400).json({
        message: "Connection request already exists",
      });

    //Final call
    const connection = await ConnectionRequestModel.create({
      fromUserId: fromUser,
      toUserId: toUser,
      status: status,
    });

    return res.status(201).json({
      message: `${req.params.status} profile`,
      connection, //sending back connection data
    });
  } catch (error) {
    console.error("Error while sending connection request :" + error);

    return res.status(500).json({
      message: "server error , please try again later " + error.message,
    });
  }
};

// A controller for accepting / rejecting the request ,
// the API is
//POST -> /request/review/:status["interested" , "rejected"]

const reviewrequestController = async (req, res) => {
  try {
    const status = req.params.status;
    const requestId = req.params.requestId;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status type Request :" + status,
      });
    }

    //    const connectionRequest = await ConnectionRequestModel.findOne({
    //     _id : requestId,
    //     toUserId : req.userid,
    //     status : "interested"
    //    })

    const reviewedRequest = await ConnectionRequestModel.findOneAndUpdate(
      {
        _id: requestId,
        toUserId: req.userid,
        status: "interested",
      },
      {
        status: status,
      }
    );

    if (!reviewedRequest) {
      return res.status(400).json({
        message: "No request found to review",
      });
    }

    //  console.log("Reviewed Request", reviewedRequest);
    return res.json({
      message: `Request reviewed to ${status}`,
    });
  } catch (error) {
    console.error("Error while reviewing connection request :" + error);

    return res.status(500).json({
      message: "server error , please try again later " + error.message,
    });
  }
};

module.exports = {
  statusController,
  reviewrequestController,
};
