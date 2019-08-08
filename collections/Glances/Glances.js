import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Glances = new Mongo.Collection('glances');

Glances.allow({
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

Schemas.Glance = new SimpleSchema(
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

Glances.attachSchema(Schemas.Glance);

require('./helpers');
require('./hooks');

Glances.rawCollection().createIndex(
  { studyId: 1, participantId: 1, stimulusId: 1 },
  (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(`Glances indexed: ${result}`);
  },
);

Glances.rawCollection().createIndex(
  { analysisId: 1, participantId: 1, stimulusId: 1 },
  (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(`Glances indexed: ${result}`);
  },
);

Glances.rawCollection().createIndex(
  { participantId: 1, stimulusId: 1, number: 1 },
  (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(`Glances indexed: ${result}`);
  },
);

Glances.rawCollection().createIndex(
  { analysisId: 1, aoiId: 1 },
  (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(`Glances indexed: ${result}`);
  },
);

export default Glances;
