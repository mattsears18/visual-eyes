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
    minFixationDuration: {
      type: Number,
      label: 'Minimum Fixation Duration (ms)',
      optional: true,
      defaultValue: 120,
    },
    minVisitDuration: {
      type: Number,
      label: 'Minimum Visit Duration (ms)',
      defaultValue: 120,
    },
    maxOffTargetFixations: {
      type: Number,
      label: 'Maximum Off-Target Fixations (Sequential)',
      defaultValue: 0,
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
      defaultValue: 'needsProcessing',
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
