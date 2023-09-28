const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String ,
        require:true
    },
    value1:{
        type:Number ,
        require:true
    },
    value2:{
        type:Number ,
        require:true
    },
    operator:{
        type:String ,
        require:true
    },
    result:{
        type:Number ,
        require:false
    }
},
)
module.exports = mongoose.model('User' ,userSchema )
