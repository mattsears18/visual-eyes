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
  },
  headersRemoved: {
    type: String,
    optional: true,
  },
  fileFormat: {
    type: String,
    optional: true,
  },
  rawRowCount: {
    type: Number,
    optional: true,
  },
  gazePointCount: {
    type: Number,
    optional: true,
  },
  nonDuplicateGazePointCount: {
    type: Number,
    optional: true,
  },
  fixationCount: {
    type: Number,
    optional: true,
  },
});

options = {
  collectionName: 'Datafiles',
  schema: Schemas.Datafile,
  allowClientCode: true, // Required to let you remove uploaded file
}

path = Meteor.settings.public.uploads;
if(path) { options.storagePath = path + '/datafiles'; }

Datafiles = new FilesCollection(options);

Datafiles.collection.attachSchema(new SimpleSchema(Schemas.Datafile));

export default Datafiles;
