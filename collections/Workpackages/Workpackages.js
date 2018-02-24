import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Workpackages = new Mongo.Collection('workpackages');

Workpackages.allow({
  insert: function(userId, doc) {
    return true;
    if(!Roles.userIsInRole(userId, 'create', 'workpackages')) {
      throw new Meteor.Error('workpackages.create.unauthorized',
        'You do not have permission to create workpackages.');
    } else {
      return true;
    }
  },
  update: function(userId, doc) {
    return true;
    workpackage = Workpackages.findOne({_id: doc._id});
    return workpackage.hasPermission('update');
  },
  remove: function(userId, doc) {
    return true;
    workpackage = Workpackages.findOne({_id: doc._id});
    return workpackage.hasPermission('destroy');
  },
});

Schemas.Workpackage = new SimpleSchema({
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
  omniclasses: {
    type: String,
    label: 'Associated Omniclass Codes',
    optional: true,
  },
  location: {
    type: String,
    label: 'Location within Project',
    optional: true,
  },
  dateStart: {
    type: Date,
    label: 'Start Date',
    optional: true,
  },
  dateFinish: {
    type: Date,
    label: 'Finish Date',
    optional: true,
  },
  submittals: {
    type: String,
    label: 'Associated Submittals',
    optional: true,
  },
  drawings: {
    type: String,
    label: 'Associated Drawings',
    optional: true,
  },
  specifications: {
    type: String,
    label: 'Associated Specifications',
    optional: true,
  },
  projectId: {
    type: String,
    autoform: {
      type: 'hidden',
    },
  },
}, {tracker: Tracker});

Workpackages.attachSchema(Schemas.Workpackage);

export default Workpackages;
