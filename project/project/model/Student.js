const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    studentNumber:String,
    name:String,
    lastName:String,
    password:String,
    nationCode:String,
    mobile:String,
    educationLevel:String,
    email:String,
    educationMajor:String,
    tel:String,
    addresss:String,
    Gender:String,
    reserveID:[String],
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        refs:'courses'
    }],
    finance:[String],
    preFactor:[String],
    createAt:String,
    active:Boolean,
    instaID:String
});

module.exports = mongoose.model("Student",StudentSchema);