const mongoose  = require('mongoose');

const CourseSchema = mongoose.Schema({
    title:String,
    shortDescription:String,
    description:String,
    details:[String],
    teachers:[String],
    group:String,
    picture:String,
    video:String,
    videoPoster:String,
    showHome:Boolean,
    active:Boolean,
    typeOfCourse:String,
    createAt:String,
    ghest:Boolean

});

module.exports = mongoose.model('Course',CourseSchema);