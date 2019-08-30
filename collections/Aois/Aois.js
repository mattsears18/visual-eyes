import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Aois = new Mongo.Collection('aois');

Aois.allow({
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

Schemas.Aoi = new SimpleSchema(
  {
    name: {
      type: String,
      label: 'Name',
    },
    desc: {
      type: String,
      label: 'Description',
      autoform: {
        rows: 8,
      },
      optional: true,
    },
    studyId: {
      type: String,
      autoform: {
        type: 'hidden',
      },
    },
    stimulusId: {
      type: String,
      autoform: {
        type: 'hidden',
      },
    },
    timestampMin: {
      type: Number,
      label: 'First Gazepoint Timestamp',
      autoform: {
        type: 'hidden',
      },
      optional: true,
    },
    timestampMax: {
      type: Number,
      label: 'Last Gazepoint Timestamp',
      autoform: {
        type: 'hidden',
      },
      optional: true,
    },
    duration: {
      type: Number,
      label: 'Duration',
      autoform: {
        type: 'hidden',
      },
      optional: true,
    },
    datafileIds: {
      type: Array,
      autoform: {
        type: 'hidden',
      },
      optional: true,
    },
    'datafileIds.$': {
      type: String,
    },
  },
  { tracker: Tracker },
);

Aois.attachSchema(Schemas.Aoi);

require('./helpers');
require('./hooks');

export default Aois;
