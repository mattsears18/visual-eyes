import { Meteor } from 'meteor/meteor'
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

path = Meteor.settings.public.uploads || '/data/meteor/uploads';

Variablefiles = new FilesCollection({
  collectionName: 'Variablefiles',
  schema: Schemas.Variablefile,
  allowClientCode: true, // Required to let you remove uploaded file
  storagePath: path + '/variablefiles', //persistent testing file storage
  onAfterUpload(variablefile) {
    if(Meteor.isServer) {
      Meteor.call('variablefiles.process', { variablefileId: variablefile._id });
    }
  }
});

Variablefiles.collection.attachSchema(new SimpleSchema(Schemas.Variablefile));

export default Variablefiles;
