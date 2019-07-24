import SimpleSchema from 'simpl-schema';
import Schemas from '../../lib/schemas';

SimpleSchema.extendOptions(['autoform']);

Analyses = new Mongo.Collection('analyses');

Analyses.allow({
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

Schemas.Analysis = new SimpleSchema(
  {
    name: {
      type: String,
      label: 'Name',
      defaultValue: 'Analysis',
    },
    desc: {
      type: String,
      label: 'Description',
      autoform: {
        rows: 8,
      },
      optional: true,
    },
    minGlanceTime: {
      type: Number,
      label: 'Minimum Glance Duration (ms)',
      defaultValue: 10000,
    },
    glanceGap: {
      type: Number,
      label: 'Maximum Glance Gap Duration (ms)',
      defaultValue: 5000,
    },
    ignoreOutsideImage: {
      type: Boolean,
      label: 'Ignore Gaze Points Outside of Stimulus Areas',
      defaultValue: true,
      autoform: {
        type: 'boolean-checkbox',
      },
    },
    participantIds: {
      type: Array,
      label: 'Participants to Include',
      autoform: {
        type: 'select-checkbox',
      },
    },
    'participantIds.$': String,
    stimulusIds: {
      type: Array,
      label: 'Stimuli to Include',
      autoform: {
        type: 'select-checkbox',
      },
    },
    'stimulusIds.$': String,
    studyId: {
      type: String,
      label: 'Study',
      autoform: {
        value() {
          return FlowRouter.getParam('studyId');
        },
        type: 'hidden',
      },
    },
    status: {
      type: String,
      autoform: {
        type: 'hidden',
      },
      optional: true,
    },
    glanceCount: {
      type: Number,
      label: 'Glance Count',
      optional: true,
    },
  },
  { tracker: Tracker },
);

Analyses.attachSchema(Schemas.Analysis);

require('./helpers');
require('./hooks');

export default Analyses;
