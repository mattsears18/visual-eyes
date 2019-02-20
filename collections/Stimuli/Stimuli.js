import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Stimuli = new Mongo.Collection('stimuli');

Stimuli.allow({
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

Schemas.Stimulus = new SimpleSchema({
  stimulusfileId: {
    type: String,
    label: 'Stimulus File',
    autoform: {
      type: 'fileUpload',
      collection: 'Stimulusfiles'
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
      value: function() {
        return FlowRouter.getParam('studyId');
      },
      type: 'hidden'
    },
    optional: true,
  },
  datafileIds: {
    type: Array,
    autoform: {
      type: 'hidden',
    },
  },
  "datafileIds.$": {
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
}, {tracker: Tracker});

Stimuli.attachSchema(Schemas.Stimulus);

export default Stimuli;
