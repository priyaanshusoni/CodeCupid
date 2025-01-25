
const express = require("express");

const app = express();

const router = express.Router();

const connectionRouter = router;
const {userAuth} = require("../middlewares/userauth")

module.exports = {
    connectionRouter
}