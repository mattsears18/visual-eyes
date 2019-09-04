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
      label: 'Minimum Fixation Duration (ms)',
      optional: true,
      defaultValue: 120,
    },
    minVisitDuration: {
      type: Number,
      label: 'Minimum Visit Duration (ms)',
      optional: true,
      defaultValue: 120,
    },
    maxVisitGapDuration: {
      type: Number,
      label: 'Maximum Visit Gap Duration (ms)',
      optional: true,
    },
    includeOutsideImage: {
      type: Boolean,
      label: 'Include Fixations Outside of Stimulus Areas',
      defaultValue: false,
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
    visitCount: {
      type: Number,
      optional: true,
      autoform: {
        type: 'hidden',
      },
    },
    visitDurationMean: {
      type: Number,
      optional: true,
      autoform: {
        type: 'hidden',
      },
    },
    visitDurationMedian: {
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
