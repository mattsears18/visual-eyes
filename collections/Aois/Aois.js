import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Aois = new Mongo.Collection('aois');

Aois.allow({
  insert: function(userId, doc) {
    return true;
    if(!Roles.userIsInRole(userId, 'create', 'aois')) {
      throw new Meteor.Error('aois.create.unauthorized',
        'You do not have permission to create aois.');
    } else {
      return true;
    }
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
}, {tracker: Tracker});

Aois.attachSchema(Schemas.Aoi);

export default Aois;
