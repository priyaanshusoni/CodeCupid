
const express = require("express");

const app = express();

const router = express.Router();

const profileRouter = router;
const {userAuth} = require("../middlewares/userauth")

module.exports = {
    profileRouter
}


