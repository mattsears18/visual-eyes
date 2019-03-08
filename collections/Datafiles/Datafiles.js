import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema';

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

path = Meteor.settings.public.uploads || '/data/meteor/uploads';

Datafiles = new FilesCollection({
  collectionName: 'Datafiles',
  schema: Schemas.Datafile,
  allowClientCode: true, // Required to let you remove uploaded file
  storagePath: path + '/datafiles', //persistent testing file storage
});

Datafiles.collection.attachSchema(new SimpleSchema(Schemas.Datafile));

export default Datafiles;
