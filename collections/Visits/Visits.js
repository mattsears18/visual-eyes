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
    aoiId: {
      type: String,
    },
    number: {
      type: Number,
      label: 'Number',
    },
    timestamp: {
      type: Number,
      label: 'First Fixation Timestamp',
      autoform: {
        type: 'hidden',
      },
    },
    timestampEnd: {
      type: Number,
      label: 'Last Fixation Timestamp End',
      autoform: {
        type: 'hidden',
      },
    },
    duration: {
      type: Number,
      label: 'Duration',
      autoform: {
        type: 'hidden',
      },
    },
    combinedEventIndexStart: {
      type: Number,
    },
    combinedEventIndexEnd: {
      type: Number,
    },
    averageSlideHullCoverage: {
      type: Number,
      optional: true,
      autoform: {
        type: 'hidden',
      },
    },
  },
  { tracker: Tracker },
);

Visits.attachSchema(Schemas.Visit);

require('./helpers');
require('./hooks');

if (Meteor.isServer && !Meteor.isTest) {
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
