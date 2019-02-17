import SimpleSchema from 'simpl-schema';

// SimpleSchema.extendOptions(['autoform']);

Schemas.Datafile = Object.assign({}, FilesCollection.schema, {
  studyId: {
    type: String,
    optional: true,
  },
  participantId: {
    type: String,
    optional: true,
  },
  format: {
    type: String,
    optional: true,
  },
  preprocessing: {
    type: Boolean,
    optional: true,
  },
  processing: {
    type: Boolean,
    optional: true,
  },
  processed: {
    type: Boolean,
    optional: true,
  },
  recordings: {
    type: Number,
    optional: true,
  },
  recordingsProcessed: {
    type: Number,
    optional: true,
  }
});

Datafiles = new FilesCollection({
  collectionName: 'Datafiles',
  schema: Schemas.Datafile,
  allowClientCode: true, // Required to let you remove uploaded file
  storagePath: '/data/Meteor/uploads/datafiles', //persistent testing file storage
});

Datafiles.collection.attachSchema(new SimpleSchema(Schemas.Datafile));

export default Datafiles;
