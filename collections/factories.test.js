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

var chaiAsPromised = require("chai-as-promised");

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
  width: () => faker.random.number({min: 100, max: 3000}),
  height: () => faker.random.number({min: 100, max: 3000}),
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
  x: () => Math.random() * 1000,
  y: () => Math.random() * 1000,
});


Factory.define('viewing', Viewings, {
  analysisId: () => Factory.create('analysis')._id,
  studyId: () => Factory.create('study')._id,
  participantId: () => Factory.create('participant')._id,
  stimulusId: () => Factory.create('stimulus')._id,
  number: () => faker.random.number({ min: 1, max: 10 }),
  period: () => 5000,
  aoiIds: [],
  gazepoints: [],
});


// viewing with Gazepoints
let study = Factory.create('study');
let datafile = Factory.create('imotionsDatafile', { studyId: study._id });
let participant = Factory.create('participant', { studyId: study._id, datafileIds: [datafile._id] });
let stimulus = Factory.create('stimulus', { studyId: study._id });
let aoi = Factory.create('aoi', { studyId: study._id, stimulusId: stimulus._id });
let analysis = Factory.create('analysis', { studyId: study._id });

let gazepoints = [];

for(i = 0; i < 100; i++) {
  let gazepoint = Factory.create('gazepoint', {
    studyId: study._id,
    datafileId: datafile._id,
    participantId: participant._id,
    stimulusId: stimulus._id,
    aoiId: aoi._id,
  });

  gazepoints.push(gazepoint);
}

gazepoints.sort((a, b) => a.timestamp - b.timestamp);

Factory.define('viewingWithGazepoints', Viewings, {
  analysisId: analysis._id,
  studyId: study._id,
  participantId: participant._id,
  stimulusId: stimulus._id,
  number: () => faker.random.number({ min: 1, max: 10 }),
  period: 5000,
  aoiIds: [aoi._id],
  gazepoints: gazepoints,
});
