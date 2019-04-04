export default function findOrInsert(collectionName, query) {
  let collection = Mongo.Collection.get(collectionName);

  if(!collection) throw new Error('noCollectionFound');
  if(typeof(query) != 'object') throw new Error('queryMustBeJson');

  let cleanQuery = collection.simpleSchema().clean(query);

  let existing = collection.findOne(cleanQuery);
  if(existing) {
    return existing._id;
  } else {
    try{
      let docId = collection.insert(cleanQuery);
      return docId;
    }
    catch(err) {
      console.log(err);
    }
  }
}
