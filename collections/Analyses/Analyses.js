import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Analyses = new Mongo.Collection('analyses');

Analyses.allow({
  insert(userId, doc) {
    return true;
    if (!Roles.userIsInRole(userId, 'create', 'analyses')) {
      throw new Meteor.Error('analyses.create.unauthorized',
        'You do not have permission to create analyses.');
    } else {
      return true;
    }
  },
  update(userId, doc) {
    return true;
    analysis = Analyses.findOne({ _id: doc._id });
    return analysis.hasPermission('update');
  },
  remove(userId, doc) {
    return true;
    analysis = Analyses.findOne({ _id: doc._id });
    return analysis.hasPermission('destroy');
  },
});

Schemas.Analysis = new SimpleSchema({
  name: {
    type: String,
    label: 'Name',
  },
  desc: {
    type: String,
    label: 'Description',
    autoform: {
      rows: 8,
    },
    optional: true,
  },
  viewingGap: {
    type: Number,
    label: 'Viewing Gap (ms)',
    defaultValue: 5000,
  },
  minViewingTime: {
    type: Number,
    label: 'Minimum Viewing Time (ms)',
    defaultValue: 10000,
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
}, { tracker: Tracker });

Analyses.attachSchema(Schemas.Analysis);

require('./helpers');
require('./hooks');

export default Analyses;
