const mongoose = require('mongoose');

const PrefactorSchema = mongoose.Schema({
    courseID:{
        type:mongoose.Schema.Types.ObjectId
    },
    detailsID:{
           type:mongoose.Schema.Types.ObjectId 
    },
    studentID:{
        type:mongoose.Schema.Types.ObjectId 
    },
    createAt:String,
    payment:Boolean
})

module.exports = mongoose.model("Prefactor",PrefactorSchema);