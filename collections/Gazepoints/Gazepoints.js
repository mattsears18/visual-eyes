import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Gazepoints = new Mongo.Collection('gazepoints');

Gazepoints.allow({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
});

Schemas.Gazepoint = new SimpleSchema(
  {
    studyId: {
      type: String,
    },
    datafileId: {
      type: String,
    },
    fileFormat: {
      type: String,
    },
    participantId: {
      type: String,
      label: 'participantId',
    },
    stimulusId: {
      type: String,
    },
    aoiId: {
      type: String,
    },
    timestamp: {
      type: Number,
      label: 'Timestamp',
    },
    timeOfDay: {
      type: String,
      label: 'Time of Day',
      optional: true,
    },
    category: {
      type: String,
      label: 'Category',
      optional: true,
    },
    fixationIndex: {
      type: String,
      label: 'Index',
      optional: true,
    },
    x: {
      type: Number,
      label: 'X',
    },
    y: {
      type: Number,
      label: 'Y',
    },
  },
  { tracker: Tracker },
);

Gazepoints.attachSchema(Schemas.Gazepoint);

require('./helpers');
require('./hooks');

export default Gazepoints;
