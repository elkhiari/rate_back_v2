const mongoose = require('mongoose')

const rateModel = new mongoose.Schema({
        rate:{
            type:String,
            enum:["Excellent","Bien","Mauvaise","Très mauvais"],
            required:true,
            trim:true
        },
    createAt:{
        type:Date,
        default:Date.now,
    }
})

module.exports =  mongoose.model("rate",rateModel);