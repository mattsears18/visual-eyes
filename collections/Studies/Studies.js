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
  // datafileFormat: {
  //   type: String,
  //   label: "Data File Format",
  //   autoform: {
  //     type: "select-radio-inline",
  //     options: [
  //       { label: "SMI", value: "smi" },
  //       { label: "iMotions", value: "imotions" },
  //     ],
  //   },
  //   defaultValue: "smi",
  // },
  datafileIds: {
    type: Array,
    label: 'Eye Tracking Data Files (.txt, .csv, etc.)'
  },
  "datafileIds.$": {
    type: String,
    autoform: {
      type: 'fileUpload',
      collection: 'Datafiles'
    }
  },
  fixationsOnly: {
    type: Boolean,
    label: 'Use Fixations Instead of Gaze Points (Faster)',
    defaultValue: true,
    autoform: {
      type: 'boolean-checkbox',
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
