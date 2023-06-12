const mongoose = require('mongoose')

const EcranFingerprintModel = new mongoose.Schema({
        pin:{
            type:String,
            required:true,
            trim:true
        },
        ecran:{
            type:String,
            required:true,
            trim:true
        },
        createAt:{
            type:Date,
            default:Date.now,
        }
})

module.exports =  mongoose.model("EcranFingerprint",EcranFingerprintModel);

