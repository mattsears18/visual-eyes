import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Viewings = new Mongo.Collection('viewings');

Viewings.allow({
  insert: function(userId, doc) {
    return true;
    if(!Roles.userIsInRole(userId, 'create', 'viewings')) {
      throw new Meteor.Error('viewings.create.unauthorized',
        'You do not have permission to create viewings.');
    } else {
      return true;
    }
  },
  update: function(userId, doc) {
    return true;
    viewing = Viewings.findOne({_id: doc._id});
    return viewing.hasPermission('update');
  },
  remove: function(userId, doc) {
    return true;
    viewing = Viewings.findOne({_id: doc._id});
    return viewing.hasPermission('destroy');
  },
});

Schemas.Viewing = new SimpleSchema({
  analysisId: {
    type: String,
  },
  datafileId: {
    type: String,
  },
  aoiId: {
    type: String,
  },
  number: {
    type: Number,
    label: 'Number',
  },
  viewingsComplete: {
    type: String,
    label: 'Viewings Complete',
    autoform: {
      afFieldInput: {
        type: 'hidden',
      }
    },
    optional: true,
  },
}, {tracker: Tracker});

Viewings.attachSchema(Schemas.Viewing);

export default Viewings;
