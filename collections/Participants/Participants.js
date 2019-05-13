import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Participants = new Mongo.Collection('participants');

Participants.allow({
  insert(userId, doc) {
    return true;
    if (!Roles.userIsInRole(userId, 'create', 'participants')) {
      throw new Meteor.Error('participants.create.unauthorized',
        'You do not have permission to create participants.');
    } else {
      return true;
    }
  },
  update(userId, doc) {
    return true;
    participant = Participants.findOne({ _id: doc._id });
    return participant.hasPermission('update');
  },
  remove(userId, doc) {
    return true;
    participant = Participants.findOne({ _id: doc._id });
    return participant.hasPermission('destroy');
  },
});

Schemas.Participant = new SimpleSchema({
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
}, { requiredByDefault: false, tracker: Tracker });

Participants.attachSchema(Schemas.Participant);

require('./helpers');
require('./hooks');

export default Participants;
