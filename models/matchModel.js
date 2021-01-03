const mongoose = require('mongoose')
const schema = mongoose.Schema({
    stadion:{
        type:String,
        required:true
    },
    match_date:{
        type: Date
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    stats:[
        {type:mongoose.Schema.Types.ObjectId,ref:'Stat'}
    ]
})

module.exports = mongoose.model('Match',schema)