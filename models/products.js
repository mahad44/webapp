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

exports.Products= mongoose.model("Products",productSchema)
