const mongoose = require('mongoose');


const PathCourseSchema = mongoose.Schema({
    numberStep:String,
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"courses"
    },
    pathId:{
        type:mongoose.Schema.Types.ObjectId,
        refs:'paths'
    },
    active:Boolean
})


module.exports = mongoose.model("PathCourse",PathCourseSchema);