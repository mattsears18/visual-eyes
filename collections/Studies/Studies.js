import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Studies = new Mongo.Collection('studies');

Studies.allow({
  insert: function(userId, doc) {
    return true;
    if(!Roles.userIsInRole(userId, 'create', 'studies')) {
      throw new Meteor.Error('studies.create.unauthorized',
        'You do not have permission to create studies.');
    } else {
      return true;
    }
  },
  update: function(userId, doc) {
    return true;
    study = Studies.findOne({_id: doc._id});
    return study.hasPermission('update');
  },
  remove: function(userId, doc) {
    return true;
    study = Studies.findOne({_id: doc._id});
    return study.hasPermission('destroy');
  },
});

Schemas.Study = new SimpleSchema({
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
  datafileId: {
    type: String,
    label: 'Eye Tracking Data File',
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Datafiles',
      },
    },
  },
  aois: {
    type: String,
    label: 'Areas of Interest',
    defaultValue: function() {
      return 'Spool 1, Spool 2, Spool 3, Spool 4, Spool 5, Spool 6, Spool 7, Spool 8, Spool 9, Spool 10';
    },
  },
  periods: {
    type: String,
    label: 'Periods',
    defaultValue: function() {
      return '3000, 5000, 10000';
    },
  },
  viewingGap: {
    type: Number,
    label: 'Viewing Gap',
    defaultValue: function() {
      return '5000';
    },
  },
  viewingMinTime: {
    type: String,
    label: 'Minimum Viewing Time',
    defaultValue: function() {
      return '10000';
    },
  }
}, {tracker: Tracker});

Studies.attachSchema(Schemas.Study);

export default Studies;
