
const express = require("express");
const app = express();
const router = express.Router();
const profileRouter = router;
const {userAuth} = require("../middlewares/userauth")
const {profileeditController,userprofileController,deleteprofileController,passwordController} = require("../controllers/profileController")

profileRouter.patch("/edit",userAuth,profileeditController);

profileRouter.get("/view",userAuth,userprofileController);

profileRouter.patch("/forgotpassword",userAuth,passwordController); //still needs to be implemented

profileRouter.delete("/delete",userAuth,deleteprofileController)



module.exports = {
    profileRouter
}


