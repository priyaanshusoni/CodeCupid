const express = require("express");
const {signinController , signupController , pathupdateController , updateController , profileController , deleteController} = require("../controllers/userController")
const router = express.Router();

const userRouter = router
userRouter.post("/signup" , signupController);
userRouter.post("/signin" , signinController);
userRouter.get("/profile" , profileController);
userRouter.put("/update" , updateController);
userRouter.patch("/update" , pathupdateController);
userRouter.delete("/delete" , deleteController);


module.exports = {
    userRouter
}
