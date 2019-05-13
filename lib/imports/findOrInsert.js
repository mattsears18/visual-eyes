export default function findOrInsert(collectionName, query) {
  const collection = Mongo.Collection.get(collectionName);

  if (!collection) throw new Error('noCollectionFound');
  if (typeof (query) !== 'object') throw new Error('queryMustBeJson');

  const cleanQuery = collection.simpleSchema().clean(query);

  const existing = collection.findOne(cleanQuery);
  if (existing) {
    return existing._id;
  }
  try {
    const docId = collection.insert(cleanQuery);
    return docId;
  } catch (err) {
    console.log(err);
  }
}
