import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Drawings = new Mongo.Collection('drawings');

Drawings.allow({
  insert: function(userId, doc) {
    return true;
    if(!Roles.userIsInRole(userId, 'create', 'drawings')) {
      throw new Meteor.Error('drawings.create.unauthorized',
        'You do not have permission to create drawings.');
    } else {
      return true;
    }
  },
  update: function(userId, doc) {
    return true;
    drawing = Drawings.findOne({_id: doc._id});
    return drawing.hasPermission('update');
  },
  remove: function(userId, doc) {
    return true;
    drawing = Drawings.findOne({_id: doc._id});
    return drawing.hasPermission('destroy');
  },
});

Schemas.Drawing = new SimpleSchema({
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

Drawings.attachSchema(Schemas.Drawing);

export default Drawings;
