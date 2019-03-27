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
  status: {
    type: String,
    defaultValue: 'needsProcessing',
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
  rawRowsProcessed: {
    type: Number,
    optional: true,
  },
  dupGazepointCount: {
    type: Number,
    optional: true,
  },
  gazepointCount: {
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
