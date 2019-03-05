import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Analyses = new Mongo.Collection('analyses');

Analyses.allow({
  insert: function(userId, doc) {
    return true;
    if(!Roles.userIsInRole(userId, 'create', 'analyses')) {
      throw new Meteor.Error('analyses.create.unauthorized',
        'You do not have permission to create analyses.');
    } else {
      return true;
    }
  },
  update: function(userId, doc) {
    return true;
    analysis = Analyses.findOne({_id: doc._id});
    return analysis.hasPermission('update');
  },
  remove: function(userId, doc) {
    return true;
    analysis = Analyses.findOne({_id: doc._id});
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
      rows: 8
    },
    optional: true,
  },
  period: {
    type: Number,
    label: 'Period (ms)',
    defaultValue: 5000,
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
  // ignoreAoiNoName: {
  //   type: Boolean,
  //   label: 'Ignore Areas of Interest with No Name',
  //   defaultValue: true,
  //   autoform: {
  //     type: 'boolean-checkbox',
  //   }
  // },
  ignoreOutsideImage: {
    type: Boolean,
    label: 'Ignore Fixations Outside of Reference Image Areas',
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
  		value: function() {
  			return FlowRouter.getParam('studyId');
  		},
  		type: 'hidden'
  	},
  },
  status: {
    type: String,
    autoform: {
      type: 'hidden',
    },
    optional: true,
  },
}, {tracker: Tracker});

Analyses.attachSchema(Schemas.Analysis);

export default Analyses;
