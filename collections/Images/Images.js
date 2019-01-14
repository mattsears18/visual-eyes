import SimpleSchema from 'simpl-schema';

Schemas.Image = Object.assign({}, FilesCollection.schema, {
  studyId: {
    type: String,
    optional: true,
  },
  width: {
    type: Number,
    optional: true,
  },
  height: {
    type: Number,
    optional: true,
  }
});

Images = new FilesCollection({
  collectionName: 'Images',
  schema: Schemas.Image,
  allowClientCode: true, // Required to let you remove uploaded file
  storagePath: '/data/Meteor/uploads/images', //persistent testing file storage
});

Images.collection.attachSchema(new SimpleSchema(Schemas.Image));

export default Images;
