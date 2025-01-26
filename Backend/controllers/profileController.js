const zod = require("zod");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user");
const { UserSchema } = require("../utils/SchemaValidation");
const bcrypt = require("bcrypt");
require("dotenv").config();
const profileeditController = async (req, res) => {
  const {  ...updateddata } = req.body;

  // I don't want user to allow to update email id's once registered

  if (!email) {
    // remove email check after auth middleware coz this route restricts email update
    return res.status(400).json({
      message: "Kindly fill all necessary details",
    });
  }

  try {
    const ALLOWED_UPDATES = [
      "photoUrl",
      "bio",
      "gender",
      "age",
      "skills",
      "firstName",
      "lastName",
      "userName",
    ];

    //Convering keys from req.body to an array using Object.keys() then applying every function on that array to check it only has allowed updates fields so that user if sends any
    //random field to update we return back a error message also email is not updated through this code .

    const isupdateAllowed = Object.keys(updateddata).every((x) =>
      ALLOWED_UPDATES.includes(x)
    );
    if (!isupdateAllowed)
      return res.status(400).json({ message: "Update not allowed" });

    const user = await UserModel.findOneAndUpdate(
      {
        _id : req.userid
      },
      {
        $set: updateddata,
      }
    );

    if (!user) return res.status(400).json({ message: "not logged in , kindly login" });

    return res.json({ message: "Updation of user data is successfull :" + user.email });
  } catch (error) {
    console.error("Error while updation" + error);
    return res.json({ "UPDATE FAILED ": error.message });
  }
};


const userprofileController = async (req, res) => {
  
  try {
    const user = await UserModel.findOne({
      _id : req.userid
    });

    if (!user) {
      return res.status(400).json({ message: "Sign in Please !" });
    }

    console.log("Cookies : " , req.cookies);
    
    return res.json({
      user,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};



const passwordController = async(req,res)=>{

  const {oldPassword , newPassword} = req.body;

  
  

  try{

    const user = await UserModel.findById(req.userid);

    if(!user) return res.status(400).json({message : "No user found , login again !"})
    // console.log(user);
    
    const isPasswordmatch = await user.validatePassword(oldPassword);

   
    
    if(!isPasswordmatch) return res.status(400).json({message : "password didn't match with the old password"})

      const hashedpassword = await bcrypt.hash(newPassword , 10);

    await user.updateOne({
      password : hashedpassword
    })

    // $2b$10$yG.8exhqmb.OE1nZjEd01eFydppgi9YKdFzPVNy6DfxdP0.gyQliS


    // $2b$10$yG.8exhqmb.OE1nZjEd01eFydppgi9YKdFzPVNy6DfxdP0.gyQliS

    // $2b$10$1X4I0MzJ7/P4jalZ8DDV2.Xd1DO9wvoO1JlW0x28JOuQWWGrDHOY.

    return res.json({message : "Password updated succesfully."})

  }catch(error){

    console.error("Error during password updation:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." })

  }

}

const deleteprofileController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "kindly fill all the required fields" });

  const userId = req.userid;

  try {
    const user = await UserModel.findOneAndDelete({ email: email , _id : userId});

    if (!user) {
      return res
        .status(400)
        .json({ message: "wrong email or password , try again later" });
    }

    return res.json({ message: "Account deletion succesfull :"+user.email});
  } catch (error) {
    console.error("Error during account deletion:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};






  module.exports = {
 
    profileeditController,
    userprofileController,
    deleteprofileController,
    passwordController


  }