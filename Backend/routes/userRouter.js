const express = require("express");
const {
  signinController,
  signupController,
  pathupdateController,
  updateController,
  allprofileController,
  deleteController,
  userprofileController,
  logoutController,
  connectionRequestController
} = require("../controllers/userController");

const { userAuth } = require("../middlewares/userauth");

const router = express.Router();

const userRouter = router;
userRouter.post("/signup", signupController);
userRouter.post("/signin", signinController);
userRouter.get("/profiles", userAuth, allprofileController);  
userRouter.get("/profile", userAuth, userprofileController);
userRouter.put("/update", userAuth, updateController);
userRouter.patch("/update", userAuth, pathupdateController);
userRouter.delete("/delete", userAuth, deleteController);
userRouter.delete("/delete", userAuth, deleteController);
userRouter.post("/logout", userAuth, logoutController);
userRouter.post("/connectionrequest", userAuth,connectionRequestController);
module.exports = {
  userRouter,
};
