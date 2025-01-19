const { log } = require("console")
const {UserModel} = require("../models/user")
const signupController = async(req,res)=>{
 const {firstName , lastName , email , userName , password} = req.body



 try{
    await UserModel.create({
        firstName : firstName,
        lastName : lastName,
        userName : userName,
        password : password,
        email : email
    
     })
    
    
     return res.json({
        message : "User create succesfully "
     })
 } catch(error){
    console.log(error);
 }


    
}


const signinController = async(req,res)=>{
    
}
const profileController = async(req,res)=>{

}
const updateController = async(req,res)=>{

}
const pathupdateController = async(req,res)=>{

}
const deleteController = async(req,res)=>{

}


module.exports = {
    signupController,
    signinController,
    updateController,
    pathupdateController,
    profileController,
    deleteController
}