const express = require("express");

const app = express();

const router = express.Router();

const connectionRouter = router;
const { userAuth } = require("../middlewares/userauth");
const {
  reviewrequestController,
  ignoredController,
  statusController,
} = require("../controllers/connectionController");

connectionRouter.post("/send/:status/:touserId", userAuth, statusController);
// connectionRouter.post("/send/ignored/:touserId",userAuth,ignoredController);
connectionRouter.post(
  "/review/:status/:requestId",
  userAuth,
  reviewrequestController
);

module.exports = {
  connectionRouter,
};
