import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Gazes = new Mongo.Collection('gazes');

Gazes.allow({
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

Schemas.Gaze = new SimpleSchema(
  {
    analysisId: {
      type: String,
    },
    studyId: {
      type: String,
    },
    participantId: {
      type: String,
    },
    stimulusId: {
      type: String,
    },
    fileFormat: {
      type: String,
    },
    number: {
      type: Number,
      label: 'Number',
    },
    aoiIds: {
      type: Array,
    },
    'aoiIds.$': {
      type: String,
      autoform: {
        type: 'hidden',
      },
    },
    startTime: {
      type: Number,
      label: 'First Gazepoint Timestamp',
      optional: true,
      autoform: {
        type: 'hidden',
      },
    },
    endTime: {
      type: Number,
      label: 'Last Gazepoint Timestamp',
      optional: true,
      autoform: {
        type: 'hidden',
      },
    },
    duration: {
      type: Number,
      label: 'Duration',
      optional: true,
      autoform: {
        type: 'hidden',
      },
    },
    gazepoints: {
      type: Array,
    },
    'gazepoints.$': Object,
    'gazepoints.$.fixationIndex': {
      type: Number,
      optional: true,
    },
    'gazepoints.$.timestamp': Number,
    'gazepoints.$.x': Number,
    'gazepoints.$.y': Number,
    averageSlideHullCoverage: {
      type: Number,
      optional: true,
      autoform: {
        type: 'hidden',
      },
    },
    gazepointCount: {
      type: Number,
      optional: true,
    },
    gazepointFrequency: {
      type: Number,
      optional: true,
    },
    fixationCount: {
      type: Number,
      optional: true,
    },
    fixationFrequency: {
      type: Number,
      optional: true,
    },
    status: {
      type: String,
      optional: true,
    },
  },
  { tracker: Tracker },
);

Gazes.attachSchema(Schemas.Gaze);

require('./helpers');
require('./hooks');

export default Gazes;
