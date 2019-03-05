import SimpleSchema from 'simpl-schema';

// SimpleSchema.extendOptions(['autoform']);

Schemas.Variablefile = Object.assign({}, FilesCollection.schema, {
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
  status: {
    type: String,
    optional: true,
  },
});

Variablefiles = new FilesCollection({
  collectionName: 'Variablefiles',
  schema: Schemas.Variablefile,
  allowClientCode: true, // Required to let you remove uploaded file
  storagePath: '/data/Meteor/uploads/variablefiles', //persistent testing file storage
  onAfterUpload(variablefile) {
    if(Meteor.isServer) {
      Meteor.call('variablefiles.process', { variablefileId: variablefile._id });  
    }
  }
});

Variablefiles.collection.attachSchema(new SimpleSchema(Schemas.Variablefile));

export default Variablefiles;
