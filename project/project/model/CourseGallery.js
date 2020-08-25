const mongoose = require('mongoose');

const CourseGallerySchema = mongoose.Schema({
    src:String,
    width:String,
    height:String,
    courseID:{
        type: mongoose.Schema.Types.ObjectId,
        refs:"courses"
    },
    createAt:String
})

module.exports =  mongoose.model('CourseGallery',CourseGallerySchema);