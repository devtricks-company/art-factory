const mongoose = require('mongoose');

const MomentsSchema = mongoose.Schema({
    picture:String,
    description:String,
    createAt:String,
    active:Boolean,
    showInHome:Boolean
});

module.exports = mongoose.model('Moments',MomentsSchema);