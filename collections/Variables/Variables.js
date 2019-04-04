import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Variables = new Mongo.Collection('variables');

Variables.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc) {
    return true;
  },
  remove: function(userId, doc) {
    return true;
  },
});

Schemas.Variable = new SimpleSchema({
  name: {
    type: String,
    label: 'Name',
  },
  studyId: {
    type: String,
    label: 'Study',
    autoform: {
      value: function() {
        return FlowRouter.getParam('studyId');
      },
      type: 'hidden'
    },
    optional: true,
  },
}, {tracker: Tracker});

Variables.attachSchema(Schemas.Variable);

require('./helpers');
require('./hooks');

export default Variables;
