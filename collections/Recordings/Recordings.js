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
  name: {
    type: String,
    label: 'Name',
  },
  desc: {
    type: String,
    label: 'Description',
    autoform: {
      rows: 8
    },
    optional: true,
  },
}, {tracker: Tracker});

Recordings.attachSchema(Schemas.Recording);

export default Recordings;
