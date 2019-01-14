import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Images = new Mongo.Collection('images');

Images.allow({
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

Schemas.Image = new SimpleSchema({
  imagefileId: {
    type: String,
    label: 'Reference Image File',
    autoform: {
      type: 'fileUpload',
      collection: 'Imagefiles'
    },
  },
  name: {
    type: String,
    label: 'Name',
  },
  studyId: {
    type: String,
    label: 'Study',
    autoform: {
      value: function() {
        return FlowRouter.getParam('studyId');
      },
      type: 'hidden'
    },
    optional: true,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
}, {tracker: Tracker});

Images.attachSchema(Schemas.Image);

export default Images;
