const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ObjectId = mongoose.Schema.ObjectId


const userSchema = new Schema({
    firstName : {type : String},
    lastName : {type : String},
    userName : {type : String},
    email : {type : String},
    password : {type : String}
})


const UserModel = mongoose.model("user",userSchema);

module.exports = {
    UserModel
}