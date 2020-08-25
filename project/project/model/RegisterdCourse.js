const mongoose = require('mongoose');

const RegisterdCourse = mongoose.Schema({
    studentID:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"students"
    },
    courseID:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"courses"
    },
    detailID:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"details"
    },
    
    refID:String,
    createAt:String,
    amount:String
   

    
});


module.exports = mongoose.model('RegisterdCourse',RegisterdCourse);