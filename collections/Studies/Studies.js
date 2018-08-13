import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Studies = new Mongo.Collection('studies');

Studies.allow({
  insert: function(userId, doc) {
    return true;
    if(!Roles.userIsInRole(userId, 'create', 'studies')) {
      throw new Meteor.Error('studies.create.unauthorized',
        'You do not have permission to create studies.');
    } else {
      return true;
    }
  },
  update: function(userId, doc) {
    return true;
    study = Studies.findOne({_id: doc._id});
    return study.hasPermission('update');
  },
  remove: function(userId, doc) {
    return true;
    study = Studies.findOne({_id: doc._id});
    return study.hasPermission('destroy');
  },
});

Schemas.Study = new SimpleSchema({
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
  datafileIds: {
    type: Array,
    label: 'Eye Tracking Data .txt Files'
  },
  "datafileIds.$": {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Datafiles'
      }
    }
  },
  // periods: {
  //   type: String,
  //   label: 'Periods (ms)',
  //   defaultValue: function() {
  //     return '3000, 5000, 10000';
  //   },
  // },
  // viewingGap: {
  //   type: Number,
  //   label: 'Viewing Gap (ms)',
  //   defaultValue: function() {
  //     return '5000';
  //   },
  // },
  // minViewingTime: {
  //   type: String,
  //   label: 'Minimum Viewing Time (ms)',
  //   defaultValue: function() {
  //     return '10000';
  //   },
  // },
  removeDuplicateIndices: {
    type: Boolean,
    label: 'Remove Duplicate Indices',
    defaultValue: true,
    autoform: {
      afFieldInput: {
        type: 'boolean-checkbox',
      }
    }
  },
  recordVisualIntakesOnly: {
    type: Boolean,
    label: 'Record Visual Intakes Only',
    defaultValue: true,
    autoform: {
      afFieldInput: {
        type: 'boolean-checkbox',
      }
    }
  },
  datafilesProcessing: {
    type: Boolean,
    optional: true,
    autoform: {
      type: 'hidden',
    },
  },
  datafilesProcessed: {
    type: Boolean,
    optional: true,
    autoform: {
      type: 'hidden',
    }
  },
}, {tracker: Tracker});

Studies.attachSchema(Schemas.Study);

export default Studies;
