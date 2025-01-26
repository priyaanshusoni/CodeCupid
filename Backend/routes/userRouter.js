const express = require("express");
const {
 
  pathupdateController,
  updateController,
  feedController,
  deleteController,
  userprofileController,
} = require("../controllers/userController");

const { userAuth } = require("../middlewares/userauth");

const router = express.Router();


const userRouter = router;
userRouter.get("/feed", userAuth, feedController);  
userRouter.put("/update", userAuth, updateController);

// userRouter.post("/connectionrequest");
module.exports = {
  userRouter,
};
   