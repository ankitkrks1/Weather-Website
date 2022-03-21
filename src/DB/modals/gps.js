const mongoose = require('mongoose')

const gpsSchema = new mongoose.Schema({
    gps:{
        type:String
    }
})

const Gps = mongoose.model('Gps',gpsSchema)

module.exports= Gps