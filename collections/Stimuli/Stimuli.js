import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Stimuli = new Mongo.Collection('stimuli');

Stimuli.allow({
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

Schemas.Stimulus = new SimpleSchema({
  stimulusfileId: {
    type: String,
    label: 'Stimulus File',
    autoform: {
      type: 'fileUpload',
      collection: 'Stimulusfiles',
    },
    optional: true,
  },
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
  datafileIds: {
    type: Array,
    autoform: {
      type: 'hidden',
    },
    optional: true,
  },
  'datafileIds.$': {
    type: String,
  },
  width: {
    type: Number,
    optional: true,
  },
  height: {
    type: Number,
    optional: true,
  },
}, { tracker: Tracker });

Stimuli.attachSchema(Schemas.Stimulus);

require('./helpers');
require('./hooks');

export default Stimuli;
