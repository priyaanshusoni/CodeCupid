const express = require("express");
const {
 

  updateController,
  feedController,
  requestController
  
} = require("../controllers/userController");

const { userAuth } = require("../middlewares/userauth");

const router = express.Router();


const userRouter = router;
userRouter.get("/feed", userAuth, feedController);  
userRouter.put("/update", userAuth, updateController);
userRouter.get("/requests",userAuth,requestController) //rpute for user to see all the requeststhat are sent to him by someone else on the platform

// userRouter.post("/connectionrequest");
module.exports = {
  userRouter,
};
   