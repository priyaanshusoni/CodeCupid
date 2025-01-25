require("dotenv").config();
const jwt = require("jsonwebtoken");
const { message } = require("statuses");

function userAuth(req,res,next){
    try{
        
        const token = req.cookies.token;
        if(!token) return res.status(400).json({
            message : "Token must be provided"
        })
        const decodedInfo = jwt.verify(token,process.env.JWT_SECRET);

         if(decodedInfo){
            req.userid = decodedInfo.userid;
            next();
         }

         else{
            return res.status(403).json({
                message :  "Unauthorized :sign in please."
            })
         }



    }catch(error){

        console.error("Error during Authentication:", error);
        return res
          .status(500)
          .json({ message: "Server error. Please try again later." });

    }
}


module.exports = {
    userAuth
}