
const express = require("express");

const app = express();

const router = express.Router();

const connectionRouter = router;
const {userAuth} = require("../middlewares/userauth")
const {acceptedController,
    rejectedController,
    ignoredController,
    statusController
} = require("../controllers/connectionController")

connectionRouter.post("/send/:status/:touserId",userAuth,statusController)
// connectionRouter.post("/send/ignored/:touserId",userAuth,ignoredController);
connectionRouter.post("/review/accepted/:requestID",userAuth,acceptedController);
connectionRouter.post("/review/rejected/:requestID",userAuth,rejectedController);

module.exports = {
    connectionRouter
}