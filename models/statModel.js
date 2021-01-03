const mongoose = require('mongoose')
const schema = mongoose.Schema({
    playtime:{
        type:Number
    },
    redCards:{
        type:Number
    },
    yellowCards:{
        type:Number
    },
    soccer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Soccer',
        required:true
    },
    match:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Match',
        required:true
    }
})
module.exports = mongoose.model('Stat',schema)
