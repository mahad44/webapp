const mongoose = require('mongoose');


const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    passwordhash:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
})

exports.User=mongoose.model("User",userSchema)