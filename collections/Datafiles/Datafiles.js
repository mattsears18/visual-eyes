import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { FilesCollection } from 'meteor/ostrio:files';
import Schemas from '../../lib/schemas';

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
    type: Boolean,
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
  gazepointCount: {
    type: Number,
    optional: true,
  },
  fixationCount: {
    type: Number,
    optional: true,
  },
  saccadeCount: {
    type: Number,
    optional: true,
  },
  blinkCount: {
    type: Number,
    optional: true,
  },
});

let options;
options = {
  collectionName: 'Datafiles',
  schema: Schemas.Datafile,
  allowClientCode: true, // Required to let you remove uploaded file
};

uploadPath = Meteor.settings.public.uploads;
if (uploadPath) {
  options.storagePath = `${uploadPath}/datafiles`;
}

Datafiles = new FilesCollection(options);

Datafiles.collection.attachSchema(new SimpleSchema(Schemas.Datafile));

Datafiles.collection.allow({
  insert(userId, doc) {
    return true;
  },
  update(userId, doc) {
    return true;
  },
  remove(userId, doc) {
    return true;
  },
});

require('./helpers');
require('./hooks');

export default Datafiles;
