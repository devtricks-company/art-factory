const mongoose = require('mongoose');


const DetailSchema = mongoose.Schema({
    classcode:String,
    duration:String,
    startDate:String,
    days:String,
    capacity:String,
    price:String,
    description:String,
    active:Boolean,
    reserve:Boolean,
    register:Boolean,
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        refs:'courses'
    }
});

module.exports = mongoose.model('Detail',DetailSchema);
