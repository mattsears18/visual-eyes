import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Hullseries = new Mongo.Collection('hullseries');

Hullseries.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc) {
    return true;
  },
  remove: function(userId, doc) {
    return true;
  },
});

Schemas.Hullseries = new SimpleSchema({
  viewingId: {
    type: String,
  },
  instantContinuous: {
    type: String,
  },
  slideStep: {
    type: String,
  },
  hulls: {
    type: Array,
  },
  'hulls.$': Object,
  'hulls.$.start': Number,
  'hulls.$.end': Number,
}, {tracker: Tracker});

Hullseries.attachSchema(Schemas.Hullseries);

require('./helpers');
require('./hooks');

export default Hullseries;
