const { isRequiredInputField } = require("graphql");

const mongoose = require('mongoose');

const CourseDetailsSchema = mongoose.Schema({
    courseID:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"courses"
    },
    description:String,
    createAt:String
});

module.exports = mongoose.model('CourseDetails',CourseDetailsSchema);