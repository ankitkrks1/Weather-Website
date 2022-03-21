const mongoose = require('mongoose')

const querySchema = new mongoose.Schema({
    query:{
        type:String,
    }    
},{timestamps:true})

const Queries = mongoose.model('Queries',querySchema)

module.exports = Queries