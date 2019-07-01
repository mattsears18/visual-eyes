import SimpleSchema from 'simpl-schema';
import Schemas from '../../lib/schemas';

SimpleSchema.extendOptions(['autoform']);

Studies = new Mongo.Collection('studies');

Studies.allow({
  insert(userId, doc) {
    return true;
  },
  update(userId, doc) {
    return true;
  },
  remove(userId, doc) {
    return true;
  },
});

Schemas.Study = new SimpleSchema(
  {
    name: {
      type: String,
      label: 'Name',
    },
    desc: {
      type: String,
      label: 'Description',
      autoform: {
        rows: 8,
      },
      optional: true,
    },
    fixationsOnly: {
      type: Boolean,
      label: 'Use Fixations Instead of Gaze Points (Faster)',
      defaultValue: false,
      autoform: {
        type: 'boolean-checkbox',
      },
    },
  },
  { tracker: Tracker },
);

Studies.attachSchema(Schemas.Study);

require('./helpers');
require('./hooks');

export default Studies;
