import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';
import Datafiles from './Datafiles/Datafiles';
import Studies from './Studies/Studies';
import StubCollections from 'meteor/hwillson:stub-collections';

// StubCollections.stub([Datafiles.collection, Studies]);

Factory.define('study', Studies, {
  name: () => faker.lorem.words(),
  desc: () => faker.lorem.paragraph(),
  fixationsOnly: () => faker.boolean,
});

let baseDatafile = {
  studyId: Factory.create('study')._id,
  size: faker.random.number(),
  type: 'text/plain',
  name: () => faker.lorem.words(),
  ext: 'txt',
  extension: 'txt',
  extensionWithDot: '.txt',
  mime: 'text/plain',
  userId: '',
  _downloadRoute : '/cdn/storage',
  _collectionName : 'Datafiles',
  isVideo : false,
  isAudio : false,
  isImage : false,
  isText : true,
  isJSON : false,
  isPDF : false,
  public : false,
}

let imotionsFields = {
  path: '/Users/mattsears/code/VisualEyes/testFiles/realFile/imotionsWael.txt',
  versions : {
    original : {
        path : '/Users/mattsears/code/VisualEyes/testFiles/realFile/imotionsWael.txt',
        size : 2452899,
        type : 'text/plain',
        extension : 'txt'
    }
  },
  _storagePath : '/Users/mattsears/code/VisualEyes/testFiles/realFile/',
}

let smiFields = {
  path: '/Users/mattsears/code/VisualEyes/testFiles/realFile/smiWael.txt',
  versions : {
    original : {
        path : '/Users/mattsears/code/VisualEyes/testFiles/realFile/smiWael.txt',
        size : 4519224,
        type : 'text/plain',
        extension : 'txt'
    }
  },
  _storagePath : '/Users/mattsears/code/VisualEyes/testFiles/realFile/',
}

let unrecognizedFields = {
  path: '/Users/mattsears/code/VisualEyes/testFiles/realFile/unrecognizedWael.txt',
  versions : {
    original : {
        path : '/Users/mattsears/code/VisualEyes/testFiles/realFile/unrecognizedWael.txt',
        size : 4519224,
        type : 'text/plain',
        extension : 'txt'
    }
  },
  _storagePath : '/Users/mattsears/code/VisualEyes/testFiles/realFile/',
}

Factory.define('imotionsDatafile', Datafiles.collection,      {...baseDatafile, ...imotionsFields});
Factory.define('smiDatafile', Datafiles.collection,           {...baseDatafile, ...smiFields});
Factory.define('unrecognizedDatafile', Datafiles.collection,  {...baseDatafile, ...unrecognizedFields});
