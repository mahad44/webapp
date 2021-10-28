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
    dateofBirth:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    passwordhash:{
        type:String,
        required:true,
    },
    Image:{
        type:String,
        required:false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
})

exports.User=mongoose.model("User",userSchema)