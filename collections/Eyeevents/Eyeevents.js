import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Eyeevents = new Mongo.Collection('eyeevents');

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
      label: 'Duration',
    },
    eventIndex: {
      type: Number,
      label: 'Event Index',
      optional: true,
    },
    combinedEventIndex: {
      type: Number,
      label: 'Combined Event Index',
      optional: true,
    },
    xs: {
      type: Array,
      label: 'X Coordinates',
      optional: true,
    },
    'xs.$': Number,
    ys: {
      type: Array,
      label: 'Y Coordinates',
      optional: true,
    },
    'ys.$': Number,
    xMean: {
      type: Number,
      label: 'Mean X Coordinate',
      optional: true,
    },
    yMean: {
      type: Number,
      label: 'Mean Y Coordinate',
      optional: true,
    },
    onStimulus: {
      type: Boolean,
      optional: true,
    },
  },
  { tracker: Tracker },
);

Eyeevents.attachSchema(Schemas.Eyeevent);

require('./helpers');
// require('./hooks');

if (Meteor.isServer && !Meteor.isTest) {
  Eyeevents.rawCollection().createIndex(
    {
      participantId: 1,
      timestamp: 1,
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
      studyId: 1,
      participantId: 1,
      timestamp: 1,
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
      studyId: 1,
      participantId: 1,
      stimulusId: 1,
      timestamp: 1,
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
