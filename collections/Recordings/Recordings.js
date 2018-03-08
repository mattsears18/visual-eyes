import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Recordings = new Mongo.Collection('recordings');

Recordings.allow({
  insert: function(userId, doc) {
    return true;
    if(!Roles.userIsInRole(userId, 'create', 'recordings')) {
      throw new Meteor.Error('recordings.create.unauthorized',
        'You do not have permission to create recordings.');
    } else {
      return true;
    }
  },
  update: function(userId, doc) {
    return true;
    recording = Recordings.findOne({_id: doc._id});
    return recording.hasPermission('update');
  },
  remove: function(userId, doc) {
    return true;
    recording = Recordings.findOne({_id: doc._id});
    return recording.hasPermission('destroy');
  },
});

Schemas.Recording = new SimpleSchema({
  datafileId: {
    type: String,
    label: 'datafileId',
  },
  recordingTime: {
    type: String,
    label: 'Recording Time',
  },
  timeOfDay: {
    type: String,
    label: 'Time of Day',
  },
  category: {
    type: String,
    label: 'Category',
  },
  index: {
    type: String,
    label: 'Index',
  },
  x: {
    type: String,
    label: 'X',
  },
  y: {
    type: String,
    label: 'Y',
  },
  aoiName: {
    type: String,
    label: 'aoiName',
  },
  aoiId: {
    type: String,
    label: 'aoiId',
  },
  studyId: {
    type: String,
    label: 'studyId',
  },
}, {tracker: Tracker});

Recordings.attachSchema(Schemas.Recording);

export default Recordings;
