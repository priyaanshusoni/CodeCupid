const express = require("express");
var cookieParser = require("cookie-parser")
const app = express();
const { connectDB } = require("./config/database");
require("dotenv").config();
const cors = require("cors")
const { userRouter } = require("./routes/userRouter");
app.use(cors())
app.use(express.json());
app.use(cookieParser())
app.use("/user", userRouter);

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
