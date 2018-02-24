import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Generics = new Mongo.Collection('generics');

Generics.allow({
  insert: function(userId, doc) {
    return true;
    if(!Roles.userIsInRole(userId, 'create', 'generics')) {
      throw new Meteor.Error('generics.create.unauthorized',
        'You do not have permission to create generics.');
    } else {
      return true;
    }
  },
  update: function(userId, doc) {
    return true;
    generic = Generics.findOne({_id: doc._id});
    return generic.hasPermission('update');
  },
  remove: function(userId, doc) {
    return true;
    generic = Generics.findOne({_id: doc._id});
    return generic.hasPermission('destroy');
  },
});

Schemas.Generic = new SimpleSchema({
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

Generics.attachSchema(Schemas.Generic);

export default Generics;
