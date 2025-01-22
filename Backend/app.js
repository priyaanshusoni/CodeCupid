const express = require("express");
const app = express()
const { connectDB } = require("./config/database");
require("dotenv").config()
const {userRouter}= require("./routes/userRouter")

app.use(express.json())
app.use("/user",userRouter);



async function main(){
    try{
        await connectDB();
        app.listen((process.env.port || 3000),()=>{
        console.log(`Server has started on port http://localhost:${process.env.port || 3000}`);
    })


    }catch(error){
        console.log(error);
    }
    
}

main()






