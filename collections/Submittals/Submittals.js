import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Submittals = new Mongo.Collection('submittals');

Submittals.allow({
  insert: function(userId, doc) {
    return true;
    if(!Roles.userIsInRole(userId, 'create', 'submittals')) {
      throw new Meteor.Error('submittals.create.unauthorized',
        'You do not have permission to create submittals.');
    } else {
      return true;
    }
  },
  update: function(userId, doc) {
    return true;
    submittal = Submittals.findOne({_id: doc._id});
    return submittal.hasPermission('update');
  },
  remove: function(userId, doc) {
    return true;
    submittal = Submittals.findOne({_id: doc._id});
    return submittal.hasPermission('destroy');
  },
});

Schemas.Submittal = new SimpleSchema({
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
  projectId: {
    type: String,
    autoform: {
      type: 'hidden',
    },
  },
}, {tracker: Tracker});

Submittals.attachSchema(Schemas.Submittal);

export default Submittals;
