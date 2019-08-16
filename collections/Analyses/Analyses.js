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
    type: {
      type: String,
      label: 'Type of Analysis',
      autoform: {
        options: [
          { label: 'ISO 15007 Standard', value: 'iso15007' },
          { label: 'Custom', value: 'custom' },
        ],
        defaultValue: 'iso15007',
      },
    },
    fixationsOnly: {
      type: Boolean,
      label:
        'Use Fixations Instead of Gaze Points (Faster, ISO 15007 Compliant)',
      defaultValue: false,
      autoform: {
        type: 'boolean-checkbox',
      },
    },
    minFixationDuration: {
      type: Number,
      label: 'Minimum Glance Duration (ms) (ISO 15007 Standard = 120ms)',
      optional: true,
      defaultValue: 120,
    },
    minGlanceDuration: {
      type: Number,
      label: 'Minimum Glance Duration (ms) (ISO 15007 Standard = 120ms)',
      optional: true,
      defaultValue: 120,
    },
    maxGlanceGapDuration: {
      type: Number,
      label: 'Maximum Glance Gap Duration (ms)',
      optional: true,
      defaultValue: 120,
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
      optional: true,
      autoform: {
        type: 'hidden',
      },
    },
    glanceDurationMean: {
      type: Number,
      optional: true,
      autoform: {
        type: 'hidden',
      },
    },
    glanceDurationMedian: {
      type: Number,
      optional: true,
      autoform: {
        type: 'hidden',
      },
    },
  },
  { tracker: Tracker },
);

Analyses.attachSchema(Schemas.Analysis);

require('./helpers');
require('./hooks');

export default Analyses;
