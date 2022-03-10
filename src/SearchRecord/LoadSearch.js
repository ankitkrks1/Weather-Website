const fs = require("fs");
const path = require('path')

const location = path.join(__dirname,'../SearchRecord')

const loadQueries = () => {
  try {
    bufferData = fs.readFileSync(location+"/queries.json");
    return JSON.parse(bufferData);
  } catch (e) {
    return [];
  }
};
const saveSearches = (search) =>{

    oldSearch = loadQueries()
    oldSearch.push(search)
    fs.writeFileSync(location+"/queries.json",JSON.stringify(oldSearch))

}
module.exports = saveSearches;
