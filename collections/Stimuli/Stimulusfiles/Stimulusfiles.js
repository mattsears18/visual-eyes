import { Meteor } from 'meteor/meteor'

Schemas.Stimulusfile = Object.assign({}, FilesCollection.schema, {
  fileWidth: {
    type: Number,
    optional: true,
    autoform: {
      type: 'hidden',
    },
  },
  fileHeight: {
    type: Number,
    optional: true,
    autoform: {
      type: 'hidden',
    },
  },
});

options = {
  collectionName: 'Stimulusfiles',
  schema: Schemas.Stimulusfile,
  allowClientCode: true, // Required to let you remove uploaded file
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.ext)) {
      return true;
    } else {
      return 'Please upload stimulus, with size equal or less than 10MB';
    }
  }
}

path = Meteor.settings.public.uploads;
if(path) { options.storagePath = path + '/stimulusfiles'; }

Stimulusfiles = new FilesCollection(options);

require('./hooks');

export default Stimulusfiles;
