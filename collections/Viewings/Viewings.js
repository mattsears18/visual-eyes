import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Viewings = new Mongo.Collection('viewings');

Viewings.allow({
  insert: function(userId, doc) {
    return true;
    if(!Roles.userIsInRole(userId, 'create', 'viewings')) {
      throw new Meteor.Error('viewings.create.unauthorized',
        'You do not have permission to create viewings.');
    } else {
      return true;
    }
  },
  update: function(userId, doc) {
    return true;
    viewing = Viewings.findOne({_id: doc._id});
    return viewing.hasPermission('update');
  },
  remove: function(userId, doc) {
    return true;
    viewing = Viewings.findOne({_id: doc._id});
    return viewing.hasPermission('destroy');
  },
});

Schemas.Viewing = new SimpleSchema({
  analysisId: {
    type: String,
  },
  studyId: {
    type: String,
  },
  participantId: {
    type: String,
  },
  stimulusId: {
    type: String,
  },
  number: {
    type: Number,
    label: 'Number',
  },
  aoiIds: {
    type: Array,
  },
  "aoiIds.$": {
    type: String,
    autoform: {
      type: 'hidden',
    },
  },
  startTime: {
    type: Number,
    label: 'First Gazepoint Timestamp',
    optional: true,
    autoform: {
      type: 'hidden',
    },
  },
  endTime: {
    type: Number,
    label: 'Last Gazepoint Timestamp',
    optional: true,
    autoform: {
      type: 'hidden',
    },
  },
  duration: {
    type: Number,
    label: 'Duration',
    optional: true,
    autoform: {
      type: 'hidden',
    },
  },
  gazepoints: {
    type: Array,
  },
  'gazepoints.$': Object,
  'gazepoints.$.fixationIndex': {
    type: Number,
    optional: true,
  },
  'gazepoints.$.timestamp': Number,
  'gazepoints.$.x': Number,
  'gazepoints.$.y': Number,
  averageSlideHullCoverage: {
    type: Number,
    optional: true,
    autoform: {
      type: 'hidden',
    },
  },
  averageStepHullCoverage: {
    type: Number,
    optional: true,
    autoform: {
      type: 'hidden',
    },
  },
  gazepointCount: {
    type: Number,
    optional: true,
  },
  gazepointFrequency: {
    type: Number,
    optional: true,
  },
  fixationCount: {
    type: Number,
    optional: true,
  },
  fixationFrequency: {
    type: Number,
    optional: true,
  },
  status: {
    type: String,
    optional: true,
  },
}, {tracker: Tracker});

Viewings.attachSchema(Schemas.Viewing);

require('./helpers');
require('./hooks');

export default Viewings;
