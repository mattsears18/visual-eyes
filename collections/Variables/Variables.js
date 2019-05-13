import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Variables = new Mongo.Collection('variables');

Variables.allow({
  insert(userId, doc) {
    return true;
  },
  update(userId, doc) {
    return true;
  },
  remove(userId, doc) {
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
      value() {
        return FlowRouter.getParam('studyId');
      },
      type: 'hidden',
    },
    optional: true,
  },
}, { tracker: Tracker });

Variables.attachSchema(Schemas.Variable);

require('./helpers');
require('./hooks');

export default Variables;
