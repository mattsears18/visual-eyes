import { Factory }      from 'meteor/dburles:factory';
import faker            from 'faker';
import Datafiles        from './Datafiles/Datafiles';
import Studies          from './Studies/Studies';
import Stimuli          from './Stimuli/Stimuli';
import Aois             from './Aois/Aois';
import Gazepoints       from './Gazepoints/Gazepoints';
import Participants     from './Participants/Participants';
import Analyses         from './Analyses/Analyses';
import Viewings         from './Viewings/Viewings';
import StubCollections  from 'meteor/hwillson:stub-collections';

StubCollections.stub([
  Datafiles.collection,
  Studies,
  Stimuli,
  Aois,
  Gazepoints,
  Participants,
  Analyses,
  Viewings,
]);

console.log('stubbed');

Factory.define('study', Studies, {
  name: () => faker.lorem.words(),
  desc: () => faker.lorem.paragraph(),
  fixationsOnly: () => faker.boolean,
});

let baseDatafile = {
  studyId: () => Factory.create('study')._id,
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
  fileFormat: 'imotions',
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
  fileFormat: 'smi',
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


Factory.define('analysis', Analyses, {
  studyId: () => Factory.create('study')._id,
  name: () => faker.lorem.words(),
  desc: () => faker.lorem.paragraph(),
  period: 5000,
  viewingGap: 5000,
  minViewingTime: 10000,
  ignoreOutsideImage: () => faker.boolean,
  participantIds: [],
  stimulusIds: [],
});


Factory.define('participant', Participants, {
  name: () => faker.lorem.words(),
  studyId: () => Factory.create('study')._id,
  datafileIds: [],
});


Factory.define('stimulus', Stimuli, {
  name: () => faker.lorem.words(),
  studyId: () => Factory.create('study')._id,
});


Factory.define('aoi', Aois, {
  name: () => faker.lorem.words(),
  studyId: () => Factory.create('study')._id,
  stimulusId: () => Factory.create('stimulus')._id,
});


Factory.define('gazepoint', Gazepoints, {
  studyId: () => Factory.create('study')._id,
  datafileId: () => Factory.create('imotionsDatafile')._id,
  participantId: () => Factory.create('participant')._id,
  stimulusId: () => Factory.create('stimulus')._id,
  aoiId: () => Factory.create('aoi')._id,
  timestamp: () => Math.floor(Math.random() * 100000),
  x: () => Math.random(),
  y: () => Math.random(),
});
