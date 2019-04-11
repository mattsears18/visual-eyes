import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Gazepoints = new Mongo.Collection('gazepoints');

Gazepoints.allow({
  insert: function(userId, doc) {
    return true;
    if(!Roles.userIsInRole(userId, 'create', 'gazepoints')) {
      throw new Meteor.Error('gazepoints.create.unauthorized',
        'You do not have permission to create gazepoints.');
    } else {
      return true;
    }
  },
  update: function(userId, doc) {
    return true;
    gazepoint = Gazepoints.findOne({_id: doc._id});
    return gazepoint.hasPermission('update');
  },
  remove: function(userId, doc) {
    return true;
    gazepoint = Gazepoints.findOne({_id: doc._id});
    return gazepoint.hasPermission('destroy');
  },
});

Schemas.Gazepoint = new SimpleSchema({
  studyId: {
    type: String,
  },
  datafileId: {
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
  timestamp: {
    type: Number,
    label: 'Timestamp',
  },
  timeOfDay: {
    type: String,
    label: 'Time of Day',
    optional: true,
  },
  category: {
    type: String,
    label: 'Category',
    optional: true,
  },
  fixationIndex: {
    type: String,
    label: 'Index',
    optional: true,
  },
  x: {
    type: Number,
    label: 'X',
  },
  y: {
    type: Number,
    label: 'Y',
  },
}, {tracker: Tracker});

Gazepoints.attachSchema(Schemas.Gazepoint);

require('./helpers');
require('./hooks');

export default Gazepoints;
