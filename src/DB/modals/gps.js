const mongoose = require('mongoose')

const gpsSchema = new mongoose.Schema({
    gps:{
        type:String
    }
},{timestamps:true})

const Gps = mongoose.model('Gps',gpsSchema)

module.exports= Gps