const mongoose = require('mongoose')

const querySchema = new mongoose.Schema({
    query:{
        type:String,
    }    
})

const Queries = mongoose.model('Queries',querySchema)

module.exports = Queries