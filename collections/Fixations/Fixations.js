import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

const Fixations = new Mongo.Collection('fixations');

Fixations.allow({
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

Schemas.Fixation = new SimpleSchema(
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
    startTimestamp: {
      type: Number,
      label: 'Timestamp',
    },
    duration: {
      type: Number,
      label: 'Timestamp',
    },
    index: {
      type: String,
      label: 'Index',
      optional: true,
    },
    xMean: {
      type: Number,
      label: 'X',
    },
    yMean: {
      type: Number,
      label: 'Y',
    },
  },
  { tracker: Tracker },
);

Fixations.attachSchema(Schemas.Fixation);

// require('./helpers');
// require('./hooks');

if (Meteor.isServer) {
  Fixations.rawCollection().createIndex(
    {
      datafileId: 1,
      index: 1,
    },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(`Fixations indexed: ${result} `);
    },
  );

  Fixations.rawCollection().createIndex(
    {
      participantId: 1,
      stimulusId: 1,
      index: 1,
    },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(`Fixations indexed: ${result} `);
    },
  );
}

export default Fixations;
