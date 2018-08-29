import SimpleSchema from 'simpl-schema';

Schemas.Image = Object.assign({}, FilesCollection.schema, {

});

Images = new FilesCollection({
  collectionName: 'Images',
  schema: Schemas.Image,
  allowClientCode: true, // Required to let you remove uploaded file
  storagePath: '/data/Meteor/uploads/images', //persistent testing file storage
});

Images.collection.attachSchema(new SimpleSchema(Schemas.Image));

export default Images;





// Images = new FilesCollection({
//   collectionName: 'Images',
//   allowClientCode: true, // Required to let you remove uploaded file
//   storagePath: '/data/Meteor/uploads/images', //persistent testing file storage
// });
//
// export default Images;
