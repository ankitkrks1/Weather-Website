const mongoose = require('mongoose')


const locSchema = new mongoose.Schema({
    lat:{
      type:Number
    },
    lon:{
        type:Number
    },
    location:{
        type:String
    },
    reg:{
      type:String
    }
  },{timestamps:true})
  
const Search = mongoose.model('Search',locSchema)

module.exports = Search