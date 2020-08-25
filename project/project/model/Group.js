const mongoose = require('mongoose');

const GroupSchema = mongoose.Schema({
    name:String,
    active:Boolean
});

module.exports = mongoose.model('Group',GroupSchema);