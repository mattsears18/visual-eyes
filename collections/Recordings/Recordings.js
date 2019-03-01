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
  participantId: {
    type: String,
    label: 'participantId',
  },
  recordingTime: {
    type: Number,
    label: 'Recording Time',
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
  },
  x: {
    type: Number,
    label: 'X',
  },
  y: {
    type: Number,
    label: 'Y',
  },
  aoiName: {
    type: String,
  },
  aoiId: {
    type: String,
  },
  stimulusName: {
    type: String,
  },
  stimulusId: {
    type: String,
  },
  studyId: {
    type: String,
  },
}, {tracker: Tracker});

Recordings.attachSchema(Schemas.Recording);

export default Recordings;
