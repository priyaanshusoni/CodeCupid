const {UserModel} = require("../models/user")
const bcrypt = require("bcrypt")
const signupController = async(req,res)=>{
 const {firstName , lastName , email , userName , password , skills , gender} = req.body

 if(!firstName || !lastName || !email || !userName || !password) {
    return res.status(400).json({
        message : "Kindly fill all necessary details"
    })
 }

    try{

        const existingUser = await UserModel.findOne({email : email})
       if(existingUser) return res.status(400).json({message : "email already registred , try different one"})

    const hashedPassword = await bcrypt.hash(password , 10);
    await UserModel.create({
        firstName : firstName,
        lastName : lastName,
        userName : userName,
        password : hashedPassword,
        email : email,
        skills : skills, 
        gender : gender
    
     })
    
    
     return res.status(201).json({
        message : "Signing up successfull "
     })
 } catch(error){
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
 }
 
}


const signinController = async(req,res)=>{
    const {email , password} = req.body;


    if(!email || !password) return res.status(400).json({message : "Kindly fill all the required fields"})

    try{

      const user = await UserModel.findOne({email : email})


      if(!user) return res.status(400).json({message : "No user found , sign up instead"})

      return res.json({user})

    }catch(error){
      console.error("Error during signin:", error);
      return res.status(500).json({ message: "Server error. Please try again later." });
    }
}
const allprofileController = async(req,res)=>{
try{

const users = await UserModel.find({});

if(users.length==0) return res.status(500).json({message : "no profiles to show"})


return res.json({users});
} catch(error){
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
}




}
const userprofileController = async (req,res)=>{

  const { email , password} = req.body;

   if(!email || !password) {
     return res.status(400).json({
        message : "Kindly fill all necessary details"
     })}

   try{
    const user = await UserModel.findOne({
        email : email
     })

     if(!user){
        return res.status(400).json({message : "Email does not exist"});
 
     }
     

     const isPasswordMatch = await bcrypt.compare(password , user.password)
    

     if(!isPasswordMatch) return res.status(403).json({message : "Invalid email or password"})

     return res.json({
        user
     })
   }catch(error){
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
   }
 
  




}
const updateController = async(req,res)=>{

}
const pathupdateController = async(req,res)=>{
 const {email , ...updateddata }  = req.body;
 

if(!email) return res.status(400).json({message : "email required!"})
 try{

   const user =  await UserModel.findOneAndUpdate({
      email : email
   },{
     
    $set :updateddata
   })

   console.log(user);
   
   return res.json({message : "Updation of user data is successfull",
user})

 }catch(error){
   console.error("Error while updation"+ error)
   return res.json({"UPDATE FAILED " : error.message})
 }


}
const deleteController = async(req,res)=>{
     const {email , password} = req.body;

     if(!email || !password)  return res.status(400).json({message : "kindly fill all the required fields"})

     try{

       const user = await UserModel.findOneAndDelete({email : email})

       if(!user) {
         return res.status(400).json({message : "no user exists with this email"})
       }

       return res.json({message : "Account deletion succesfull" , 
         user})

       

     } catch(error){
      console.error("Error during account deletion:", error);
      return res.status(500).json({ message: "Server error. Please try again later." });
     }
}


module.exports = {
    signupController,
    signinController,
    updateController,
    pathupdateController,     
    allprofileController,
    deleteController,
    userprofileController
}
