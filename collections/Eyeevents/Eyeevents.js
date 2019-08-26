import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

const Eyeevents = new Mongo.Collection('eyeevents');

Eyeevents.allow({
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

Schemas.Eyeevent = new SimpleSchema(
  {
    studyId: {
      type: String,
    },
    datafileId: {
      type: String,
    },
    type: {
      type: String, // fixation, saccade, or blink
    },
    // only necessary for saccades
    fromAoiId: {
      type: String,
      optional: true,
    },
    // only necessary for saccades
    toAoiId: {
      type: String,
      optional: true,
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
      optional: true,
    },
    timestamp: {
      type: Number,
      label: 'Timestamp',
    },
    duration: {
      type: Number,
      label: 'Timestamp',
    },
    eventIndex: {
      type: String,
      label: 'Index',
      optional: true,
    },
    x: {
      type: Number,
      label: 'X',
      optional: true,
    },
    y: {
      type: Number,
      label: 'Y',
      optional: true,
    },
  },
  { tracker: Tracker },
);

Eyeevents.attachSchema(Schemas.Eyeevent);

// require('./helpers');
// require('./hooks');

if (Meteor.isServer) {
  Eyeevents.rawCollection().createIndex(
    {
      datafileId: 1,
      type: 1,
      index: 1,
    },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(`Eyeevents indexed: ${result} `);
    },
  );

  Eyeevents.rawCollection().createIndex(
    {
      participantId: 1,
      stimulusId: 1,
      index: 1,
    },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(`Eyeevents indexed: ${result} `);
    },
  );
}

export default Eyeevents;
