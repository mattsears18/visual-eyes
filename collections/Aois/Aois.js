import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Aois = new Mongo.Collection('aois');

Aois.allow({
  insert: function(userId, doc) {
    return true;
    // if(!Roles.userIsInRole(userId, 'create', 'aois')) {
    //   throw new Meteor.Error('aois.create.unauthorized',
    //     'You do not have permission to create aois.');
    // } else {
    //   return true;
    // }
  },
  update: function(userId, doc) {
    return true;
    aoi = Aois.findOne({_id: doc._id});
    return aoi.hasPermission('update');
  },
  remove: function(userId, doc) {
    return true;
    aoi = Aois.findOne({_id: doc._id});
    return aoi.hasPermission('destroy');
  },
});

Schemas.Aoi = new SimpleSchema({
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
  studyId: {
    type: String,
    autoform: {
      type: 'hidden',
    }
  },
  datafileIds: {
    type: Array,
    autoform: {
      type: 'hidden',
    },
  },
  "datafileIds.$": {
    type: String,
  },
  recordingTimeMin: {
    type: Number,
    label: 'Minimum Recording Time',
    autoform: {
      type: 'hidden',
    },
    optional: true,
  },
  recordingTimeMax: {
    type: Number,
    label: 'Maximum Recording Time',
    autoform: {
      type: 'hidden',
    },
    optional: true,
  },
  recordingTimeTotal: {
    type: Number,
    label: 'Total Recording Time',
    autoform: {
      type: 'hidden',
    },
    optional: true,
  },
  stimulusId: {
    type: String,
    label: "Reference Image",
    optional: true,
    autoform: {
      type: "select2",
      firstOption: "Select a Reference Image",
      options: function () {
        stimuli = Stimuli.find({}, {sort: {'name': 1}}).map(function (stimulus) {
          return { label: stimulus.name, value: stimulus._id};
        });
        stimuli.unshift({ label: 'Select an stimulus', value: '' });
        return stimuli;
      }
    }
  },
}, {tracker: Tracker});

Aois.attachSchema(Schemas.Aoi);

export default Aois;
