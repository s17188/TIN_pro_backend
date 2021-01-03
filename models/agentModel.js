const mongoose = require('mongoose')
const schema = mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    name:{type:String},
    surname:{type:String},
    create_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Agent',schema)