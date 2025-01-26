const { default: isEmail } = require("validator/lib/isEmail")
const {z} = require("zod")
const UserSchema = z.object({
    firstName : z.string().min(3).max(90),
    lastName :  z.string().min(3).max(90),
    userName :  z.string().min(2).max(90),
    email : z.string().email(),
    password : z.string({
        required_error : "Password is required",
        invalid_type_error : "Password must be in string format"
    }).min(6).max(15),
  

})



module.exports = {
    UserSchema
}