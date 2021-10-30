const mongoose = require('mongoose');


const feedSchema=mongoose.Schema({
    userid:{
        type:String,
        required:true,
    },
    text:{
        type:String,
        required:true,
    },
    feedImage:{
        type:String,
        required:false,
    },
})

exports.Feed=mongoose.model("Feed",feedSchema)