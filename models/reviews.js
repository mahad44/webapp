const mongoose = require('mongoose');


const reviewsSchema =mongoose.Schema({
    feedid:{
        type : String,
        required: true,
    },
    userid:{
        type: String,
        required: true,
    },
    comments:{
        type: String,
        required: true,
    },
    ratings:{
        type: Number,
        default : 0,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']
    }
})


exports.Reviews = mongoose.model("Reviews",reviewsSchema)
