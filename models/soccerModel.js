const mongoose = require('mongoose')
const schema = mongoose.Schema({
    name:{type:String,required:true},
    surname:{type:String,required:true},
    birthdate: Date,
    nationality:String,
    height:Number,
    weight:Number,
    sex:{type:String,enum:['Man','Female']},
    price:Number,
    desc:String,
    age:Number,
    fifaMultipler:{type:Number,default:0.14},
    create_date: {
        type: Date,
        default: Date.now
    }
})

const Soccer = module.exports = mongoose.model('Soccer',schema)
module.exports.get = (callback, limit) => {
    Soccer.find(callback).limit(limit);
}