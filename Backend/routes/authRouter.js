const express = require("express");
const app = express();
const router = express.Router();
const authRouter = router;
const {userAuth} = require("../middlewares/userauth")
const {signinController , signupController , logoutController} = require("../controllers/authController")
authRouter.post("/signup", signupController);
authRouter.post("/signin", signinController);
authRouter.post("/logout", userAuth, logoutController);

module.exports = {
    authRouter
}