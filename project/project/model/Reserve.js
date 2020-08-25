const mongoose = require('mongoose');

const ReserveSchema = mongoose.Schema({
    studentID:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"students"
    },
    courseID:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"courses"
    },
    detailsID:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"details"
    },
    createAt:String
});


module.exports = mongoose.model('Reserve',ReserveSchema);