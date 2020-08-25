const mongoose = require('mongoose');

const TeacherSchema = mongoose.Schema({
    name:String,
    mobile:String,
    email:String,
    password:String,
    resume:String,
    picture:String,
    active:Boolean,
    createAt:String
});

module.exports = mongoose.model('Teacher',TeacherSchema);