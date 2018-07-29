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
  analysisTypes: {
    type: Array,
    label: 'Analysis Types',
    autoform: {
      type: 'select-checkbox',
      options: {
        instantaneousConvexHull: "Instantaneous Convex Hull Areas",
        cummulativeConvexHull: "Cummulative Convex Hull Area",
        instantaneousScanpathLength: "Instantaneous Scanpath Length",
        cummulativeScanpathLength: "Cummulative Scanpath Length",
        scanpathVelocity: "Scanpath Velocity",
      },
    }
  },
  'analysisTypes.$': String,
  period: {
    type: Number,
    label: 'Period (ms)',
    defaultValue: function() {
      return '5000';
    },
  },
  viewingGap: {
    type: Number,
    label: 'Viewing Gap (ms)',
    defaultValue: function() {
      return '5000';
    },
  },
  minViewingTime: {
    type: Number,
    label: 'Minimum Viewing Time (ms)',
    defaultValue: function() {
      return '10000';
    },
  },
  studyId: {
    type: String,
    label: 'Study',
    autoform: {
  		value: function() {
  			return FlowRouter.getParam('studyId');
  		},
  		type: "hidden"
  	},
  },
}, {tracker: Tracker});

Analyses.attachSchema(Schemas.Analysis);

export default Analyses;
