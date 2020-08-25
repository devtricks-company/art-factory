const mongoose = require('mongoose');

const CourseSyllabsSchema = mongoose.Schema({
    courseDetailsID:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"coursedetails"
    },
    session:String,
    title:String
});

module.exports = mongoose.model('coursesyllabs',CourseSyllabsSchema);