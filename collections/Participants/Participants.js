import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Participants = new Mongo.Collection('participants');

Participants.allow({
  insert: function(userId, doc) {
    return true;
    if(!Roles.userIsInRole(userId, 'create', 'participants')) {
      throw new Meteor.Error('participants.create.unauthorized',
        'You do not have permission to create participants.');
    } else {
      return true;
    }
  },
  update: function(userId, doc) {
    return true;
    participant = Participants.findOne({_id: doc._id});
    return participant.hasPermission('update');
  },
  remove: function(userId, doc) {
    return true;
    participant = Participants.findOne({_id: doc._id});
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
  datafileId: {
    type: String,
    autoform: {
      type: 'hidden',
    },
  },
  variables: {
    type: Array,
    label: 'Variables',
    optional: true,
  },
  'variables.$': Object,
  'variables.$.name': String,
  'variables.$.value': String,
}, {tracker: Tracker});

Participants.attachSchema(Schemas.Participant);

export default Participants;
