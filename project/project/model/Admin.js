const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    name:String,
    mobile:String,
    email:String,
    password:String,
    active:Boolean,
    createAt:String
});

module.exports = mongoose.model('Admin',AdminSchema);