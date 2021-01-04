const mongoose = require('mongoose')
const schema = mongoose.Schema({
    playtime:{
        type:Number,
        default:0
    },
    redCards:{
        type:Number,
        default:0
    },
    yellowCards:{
        type:Number,
        default:0
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
