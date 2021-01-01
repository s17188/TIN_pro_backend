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

const Agent = module.exports = mongoose.model('Agent',schema)
module.exports.get = (callback, limit) => {
    Agent.find(callback).limit(limit);
}