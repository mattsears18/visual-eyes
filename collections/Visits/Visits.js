import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Visits = new Mongo.Collection('visits');

Visits.allow({
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

Schemas.Visit = new SimpleSchema(
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
    'gazepoints.$.eventIndex': {
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

Visits.attachSchema(Schemas.Visit);

require('./helpers');
require('./hooks');

if (Meteor.isServer) {
  Visits.rawCollection().createIndex(
    { studyId: 1, participantId: 1, stimulusId: 1 },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(`Visits indexed: ${result}`);
    },
  );

  Visits.rawCollection().createIndex(
    {
      analysisId: 1,
      participantId: 1,
      stimulusId: 1,
      duration: 1,
    },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(`Visits indexed: ${result}`);
    },
  );

  Visits.rawCollection().createIndex(
    { participantId: 1, stimulusId: 1, number: 1 },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(`Visits indexed: ${result}`);
    },
  );
}

export default Visits;
