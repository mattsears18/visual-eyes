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
  fixationsOnly: {
    type: Boolean,
    label: 'Use Fixations Instead of Gaze Points (Faster)',
    defaultValue: true,
    autoform: {
      type: 'boolean-checkbox',
    }
  },
}, {tracker: Tracker});

Studies.attachSchema(Schemas.Study);

export default Studies;
