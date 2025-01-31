const { Timestamp } = require("bson");
const mongoose= require("mongoose")

const {Schema} = mongoose;

const connectionRequestSchema = new Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User", //reference to the user collection
        required : true
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },

    status : {
       type : String,
       enum : {
        values : ["interested" , "rejected" , "pending", "ignored"],
        message :'{VALUE} is not supported',
        default : "pending"
       },
       required : true
       
    },
 
  

},{
    timestamps : true
})


connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this;
 //Check if from user ID is same as to user ID 

 if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("You cannot send connection request to yourself")
 }
    next();

})

const ConnectionRequestModel = mongoose.model("ConnectionRequest",connectionRequestSchema);



module.exports = {
    ConnectionRequestModel
}