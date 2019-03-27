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
  period: {
    type: Number,
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
  gazepointIds: {
    type: Array,
  },
  "gazepointIds.$": {
    type: String,
    autoform: {
      type: 'hidden',
    },
  },
  gazepoints: {
    type: Array,
  },
  'gazepoints.$': Object,
  'gazepoints.$.fixationIndex': {
    type: String,
    optional: true,
  },
  'gazepoints.$.timestamp': String,
  'gazepoints.$.x': String,
  'gazepoints.$.y': String,
  averageSlideHullArea: {
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
}, {tracker: Tracker});

Viewings.attachSchema(Schemas.Viewing);

export default Viewings;
