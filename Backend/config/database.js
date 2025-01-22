const mongoose = require("mongoose")
const dotenv = require("dotenv");

dotenv.config()


async function connectDB(){
   

    try{

        await mongoose.connect(process.env.DB_URL);
        console.log(`Succesfully connected to the database`);

    }catch(error){
        console.log(error);
    }


}





module.exports = {
    connectDB
}


