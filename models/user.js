const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    userid:{
        type: String,
        required: true,
    },
    productname:{
        type: String,
        required: true,
    },
    productimage:{
        type:String,
        required: true,
    },
    category:{
        type:String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    }
})

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

exports.Products= mongoose.model("Products",productSchema)
exports.User=mongoose.model("User",userSchema)