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
userRouter.get("/profile", userAuth, userprofileController);
userRouter.put("/update", userAuth, updateController);
userRouter.patch("/update", userAuth, pathupdateController);
userRouter.delete("/delete", userAuth, deleteController);
userRouter.delete("/delete", userAuth, deleteController);
// userRouter.post("/connectionrequest");
module.exports = {
  userRouter,
};
