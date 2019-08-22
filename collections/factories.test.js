import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';
import StubCollections from 'meteor/hwillson:stub-collections';
import Datafiles from './Datafiles/Datafiles';
import Studies from './Studies/Studies';
import Stimuli from './Stimuli/Stimuli';
import Stimulusfiles from './Stimuli/Stimulusfiles/Stimulusfiles';
import Aois from './Aois/Aois';
import Gazepoints from './Gazepoints/Gazepoints';
import Participants from './Participants/Participants';
import Analyses from './Analyses/Analyses';
import Visits from './Visits/Visits';

StubCollections.stub([
  Datafiles.collection,
  Studies,
  Stimuli,
  Aois,
  Gazepoints,
  Participants,
  Analyses,
  Visits,
]);

console.log('stubbed');

Factory.define('study', Studies, {
  name: () => faker.lorem.words(),
  desc: () => faker.lorem.paragraph(),
  fixationsOnly: faker.random.boolean,
});

const baseDatafile = {
  studyId: () => Factory.create('study')._id,
  size: faker.random.number(),
  type: 'text/plain',
  name: () => faker.lorem.words(),
  ext: 'txt',
  extension: 'txt',
  extensionWithDot: '.txt',
  mime: 'text/plain',
  userId: '',
  _downloadRoute: '/cdn/storage',
  _collectionName: 'Datafiles',
  isVideo: false,
  isAudio: false,
  isImage: false,
  isText: true,
  isJSON: false,
  isPDF: false,
  public: false,
};

const imotionsFields = {
  fileFormat: 'imotions',
  path:
    '/Users/matthewsears/code/visual-eyes/testFiles/realFile/imotionsWael.txt',
  versions: {
    original: {
      path:
        '/Users/matthewsears/code/visual-eyes/testFiles/realFile/imotionsWael.txt',
      size: 2452899,
      type: 'text/plain',
      extension: 'txt',
    },
  },
  _storagePath: '/Users/matthewsears/code/visual-eyes/testFiles/realFile/',
};

const smiFields = {
  fileFormat: 'smi',
  path: '/Users/matthewsears/code/visual-eyes/testFiles/realFile/smiWael.txt',
  versions: {
    original: {
      path:
        '/Users/matthewsears/code/visual-eyes/testFiles/realFile/smiWael.txt',
      size: 4519224,
      type: 'text/plain',
      extension: 'txt',
    },
  },
  _storagePath: '/Users/matthewsears/code/visual-eyes/testFiles/realFile/',
};

const smiPipeFields = {
  fileFormat: 'smi',
  path:
    '/Users/matthewsears/code/visual-eyes/testFiles/realFile/Participant03.csv',
  versions: {
    original: {
      path:
        '/Users/matthewsears/code/visual-eyes/testFiles/realFile/Participant03.csv',
      size: 11369165,
      type: 'text/plain',
      extension: 'txt',
    },
  },
  _storagePath: '/Users/matthewsears/code/visual-eyes/testFiles/realFile/',
};

const unrecognizedFields = {
  path:
    '/Users/matthewsears/code/visual-eyes/testFiles/realFile/unrecognizedWael.txt',
  versions: {
    original: {
      path:
        '/Users/matthewsears/code/visual-eyes/testFiles/realFile/unrecognizedWael.txt',
      size: 4519224,
      type: 'text/plain',
      extension: 'txt',
    },
  },
  _storagePath: '/Users/matthewsears/code/visual-eyes/testFiles/realFile/',
};

Factory.define('imotionsDatafile', Datafiles.collection, {
  ...baseDatafile,
  ...imotionsFields,
});
Factory.define('smiDatafile', Datafiles.collection, {
  ...baseDatafile,
  ...smiFields,
});
Factory.define('smiPipeDatafile', Datafiles.collection, {
  ...baseDatafile,
  ...smiPipeFields,
});
Factory.define('unrecognizedDatafile', Datafiles.collection, {
  ...baseDatafile,
  ...unrecognizedFields,
});

Factory.define('analysis', Analyses, {
  studyId: () => Factory.create('study')._id,
  name: () => faker.lorem.words(),
  desc: () => faker.lorem.paragraph(),
  type: 'custom',
  maxVisitGapDuration: 5000,
  minVisitDuration: 10000,
  ignoreOutsideImage: faker.random.boolean,
  participantIds: [],
  stimulusIds: [],
});

Factory.define('participant', Participants, {
  name: () => faker.lorem.words(),
  studyId: () => Factory.create('study')._id,
  datafileIds: [],
});

Factory.define('stimulusfile', Stimulusfiles.collection, {
  studyId: () => Factory.create('study')._id,
  size: faker.random.number(),
  type: 'image/png',
  name: () => faker.lorem.words(),
  ext: 'png',
  extension: 'png',
  extensionWithDot: '.png',
  mime: 'image/png',
  userId: '',
  _downloadRoute: '/cdn/storage',
  _collectionName: 'Stimulusfiles',
  isVideo: false,
  isAudio: false,
  isImage: true,
  isText: false,
  isJSON: false,
  isPDF: false,
  public: false,
  stimulusId: () => Factory.create('stimulus')._id,
  fileWidth: () => 1222, // faker.random.number({min: 100, max: 3000}),
  fileHeight: () => 855, // faker.random.number({min: 100, max: 3000}),
  path:
    '/Users/matthewsears/code/visual-eyes/testFiles/stimulusfiles/DWG01.png',
  versions: {
    original: {
      path:
        '/Users/matthewsears/code/visual-eyes/testFiles/stimulusfiles/DWG01.png',
      size: 185427,
      type: 'image/png',
      extension: 'png',
    },
  },
  _storagePath: '/Users/matthewsears/code/visual-eyes/testFiles/stimulusfiles/',
});

Factory.define('stimulus', Stimuli, {
  name: () => faker.lorem.words(),
  studyId: () => Factory.create('study')._id,
  width: () => faker.random.number({ min: 100, max: 3000 }),
  height: () => faker.random.number({ min: 100, max: 3000 }),
  stimulusfileId: () => Factory.create('stimulusfile', { stimulusId: 'dummyId' })._id,
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

Factory.define('visit', Visits, {
  analysisId: () => Factory.create('analysis')._id,
  studyId: () => Factory.create('study')._id,
  participantId: () => Factory.create('participant')._id,
  stimulusId: () => Factory.create('stimulus')._id,
  number: () => faker.random.number({ min: 1, max: 10 }),
  aoiIds: [],
  gazepoints: [],
  fileFormat: 'imotions',
});

// visit with Gazepoints
const study = Factory.create('study');
const datafile = Factory.create('imotionsDatafile', { studyId: study._id });
const participant = Factory.create('participant', {
  studyId: study._id,
  datafileIds: [datafile._id],
});
const stimulus = Factory.create('stimulus', { studyId: study._id });
const aoi = Factory.create('aoi', {
  studyId: study._id,
  stimulusId: stimulus._id,
});
const analysis = Factory.create('analysis', {
  studyId: study._id,
  participantIds: [participant._id],
  stimulusIds: [stimulus._id],
});

const gazepoints = [];

for (let i = 0; i < 100; i += 1) {
  const gazepoint = Factory.create('gazepoint', {
    studyId: study._id,
    datafileId: datafile._id,
    participantId: participant._id,
    stimulusId: stimulus._id,
    aoiId: aoi._id,
    fileFormat: 'imotions',
  });

  gazepoints.push(gazepoint);
}

gazepoints.sort((a, b) => a.timestamp - b.timestamp);

let fixationIndex = 1;

for (let i = 0; i < 100; i += 1) {
  if (faker.random.boolean()) {
    fixationIndex += 1;
  }
  if (faker.random.boolean()) gazepoints[i].fixationIndex = fixationIndex;
}

const duration = gazepoints[gazepoints.length - 1].timestamp - gazepoints[0].timestamp;
const fixationIndices = Object.keys(
  _.groupBy(gazepoints, 'fixationIndex'),
).filter(indexString => Number.isInteger(parseInt(indexString, 10)));
const fixationCount = fixationIndices.length;

Factory.define('visitWithGazepoints', Visits, {
  analysisId: analysis._id,
  studyId: study._id,
  participantId: participant._id,
  stimulusId: stimulus._id,
  number: () => faker.random.number({ min: 1, max: 10 }),
  aoiIds: [aoi._id],
  gazepoints,
  fileFormat: 'imotions',
  startTime: gazepoints[0].timestamp,
  endTime: gazepoints[gazepoints.length - 1].timestamp,
  duration,
  gazepointCount: gazepoints.length,
  gazepointFrequency: gazepoints.length / duration,
  fixationCount,
  fixationFrequency: fixationCount / duration,
});
