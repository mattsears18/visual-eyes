import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Participants = new Mongo.Collection('participants');

Participants.allow({
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

Schemas.Participant = new SimpleSchema(
  {
    name: {
      type: String,
      label: 'Name',
    },
    studyId: {
      type: String,
      autoform: {
        type: 'hidden',
      },
    },
    datafileIds: {
      type: Array,
      optional: true,
      autoform: {
        type: 'hidden',
      },
    },
    'datafileIds.$': {
      type: String,
    },
    variableVals: {
      type: Array,
      label: 'Variables',
      optional: true,
    },
    'variableVals.$': Object,
    'variableVals.$.variableId': String,
    'variableVals.$.value': String,
  },
  { requiredByDefault: false, tracker: Tracker },
);

Participants.attachSchema(Schemas.Participant);

require('./helpers');
require('./hooks');

export default Participants;
