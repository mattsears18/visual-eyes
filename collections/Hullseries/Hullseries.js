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
  period: {
    type: Number,
  },
  timestep: {
    type: Number,
  },
  includeIncomplete: {
    type: Boolean,
  },
  averageCoverage: {
    type: Number,
    optional: true,
    autoform: {
      type: 'hidden',
    },
  },
  status: {
    type: String,
    optional: true,
  },
}, {tracker: Tracker});

Hullseries.attachSchema(Schemas.Hullseries);

require('./helpers');
require('./hooks');

export default Hullseries;
