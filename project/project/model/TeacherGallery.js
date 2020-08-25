const mongoose = require('mongoose');

const TeacherGallerySchema = mongoose.Schema({
    picture:String,
    createAt:String,
    teacherID:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"teachers"
    }
});


module.exports = mongoose.model('TeacherGallery',TeacherGallerySchema);