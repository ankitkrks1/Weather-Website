const Queries = require('../DB/modals/queries')

const saveSearches = async (query)=>{
  const qSave = new Queries({
    query
  })
  await qSave.save()
}

module.exports = saveSearches;
