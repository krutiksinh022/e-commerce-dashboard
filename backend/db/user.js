const mongoose = require("mongoose")
const userScema = new mongoose.Schema({
    name: String,
    email: String,
    password:String
})
module.exports=mongoose.model("users",userScema)