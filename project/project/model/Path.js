const mongoose  = require('mongoose');


const PathSchema = mongoose.Schema({
    number:String,
    icon:String,
    groupId:{
        type: mongoose.Schema.Types.ObjectId,
        refs:'groups'
    },
    active:Boolean,
    
});


module.exports = mongoose.model('Path',PathSchema);