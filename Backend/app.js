const express = require("express");
var cookieParser = require("cookie-parser");
const app = express();
const { connectDB } = require("./config/database");
require("dotenv").config();
const cors = require("cors");
const { userRouter } = require("./routes/userRouter");
const { profileRouter } = require("./routes/profileRouter");
const { connectionRouter } = require("./routes/connectionRouter");
const { authRouter } = require("./routes/authRouter");
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/profile", profileRouter);
app.use("/request", connectionRouter);
async function main() {
  try {
    await connectDB();
    app.listen(process.env.port || 3000, () => {
      console.log(
        `Server has started on port http://localhost:${
          process.env.port || 3000
        }`
      );
    });
  } catch (error) {
    console.log(error);
  }
}

main();
