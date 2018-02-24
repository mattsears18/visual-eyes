import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Specifications = new Mongo.Collection('specifications');

Specifications.allow({
  insert: function(userId, doc) {
    return true;
    if(!Roles.userIsInRole(userId, 'create', 'specifications')) {
      throw new Meteor.Error('specifications.create.unauthorized',
        'You do not have permission to create specifications.');
    } else {
      return true;
    }
  },
  update: function(userId, doc) {
    return true;
    specification = Specifications.findOne({_id: doc._id});
    return specification.hasPermission('update');
  },
  remove: function(userId, doc) {
    return true;
    specification = Specifications.findOne({_id: doc._id});
    return specification.hasPermission('destroy');
  },
});

Schemas.Specification = new SimpleSchema({
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

Specifications.attachSchema(Schemas.Specification);

export default Specifications;
