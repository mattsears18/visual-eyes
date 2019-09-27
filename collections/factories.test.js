import { Factory } from 'meteor/dburles:factory';
import { jStat } from 'jStat';
import faker from 'faker';
import StubCollections from 'meteor/hwillson:stub-collections';
import Datafiles from './Datafiles/Datafiles';
import Studies from './Studies/Studies';
import Stimuli from './Stimuli/Stimuli';
import Stimulusfiles from './Stimuli/Stimulusfiles/Stimulusfiles';
import Aois from './Aois/Aois';
import Gazepoints from './Gazepoints/Gazepoints';
import Eyeevents from './Eyeevents/Eyeevents';
import Participants from './Participants/Participants';
import Analyses from './Analyses/Analyses';
import Visits from './Visits/Visits';

StubCollections.stub([
  Analyses,
  Aois,
  Datafiles.collection,
  Eyeevents,
  Gazepoints,
  Participants,
  Stimuli,
  Studies,
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

const imotionsWithHeadersFields = {
  path:
    '/Users/matthewsears/code/visual-eyes/testFiles/realFile/imotionsWaelWithHeaders.txt',
  versions: {
    original: {
      path:
        '/Users/matthewsears/code/visual-eyes/testFiles/realFile/imotionsWaelWithHeaders.txt',
      size: 2452899,
      type: 'text/plain',
      extension: 'txt',
    },
  },
  _storagePath: '/Users/matthewsears/code/visual-eyes/testFiles/realFile/',
};

const smiFields = {
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

const smiWithHeadersFields = {
  path:
    '/Users/matthewsears/code/visual-eyes/testFiles/realFile/smiWaelWithHeaders.txt',
  versions: {
    original: {
      path:
        '/Users/matthewsears/code/visual-eyes/testFiles/realFile/smiWaelWithHeaders.txt',
      size: 4519224,
      type: 'text/plain',
      extension: 'txt',
    },
  },
  _storagePath: '/Users/matthewsears/code/visual-eyes/testFiles/realFile/',
};

const smiMultiFields = {
  path:
    '/Users/matthewsears/code/visual-eyes/testFiles/realFile/smiMultiParticipant03.csv',
  versions: {
    original: {
      path:
        '/Users/matthewsears/code/visual-eyes/testFiles/realFile/smiMultiParticipant03.csv',
      size: 11369165,
      type: 'text/plain',
      extension: 'txt',
    },
  },
  _storagePath: '/Users/matthewsears/code/visual-eyes/testFiles/realFile/',
};

const smiFullFields = {
  path:
    '/Users/matthewsears/code/visual-eyes/testFiles/realFile/smiFullParticipant03.csv',
  versions: {
    original: {
      path:
        '/Users/matthewsears/code/visual-eyes/testFiles/realFile/smiFullParticipant03.csv',
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

const blankFields = {
  path: '/',
};

Factory.define('imotionsDatafile', Datafiles.collection, {
  ...baseDatafile,
  ...imotionsFields,
});
Factory.define('imotionsDatafileWithHeaders', Datafiles.collection, {
  ...baseDatafile,
  ...imotionsWithHeadersFields,
});
Factory.define('smiDatafile', Datafiles.collection, {
  ...baseDatafile,
  ...smiFields,
});

Factory.define('smiDatafileWithHeaders', Datafiles.collection, {
  ...baseDatafile,
  ...smiWithHeadersFields,
});
Factory.define('smiMultiDatafile', Datafiles.collection, {
  ...baseDatafile,
  ...smiMultiFields,
});
Factory.define('smiFullDatafile', Datafiles.collection, {
  ...baseDatafile,
  ...smiFullFields,
});
Factory.define('unrecognizedDatafile', Datafiles.collection, {
  ...baseDatafile,
  ...unrecognizedFields,
});
Factory.define('emptyDatafile', Datafiles.collection, {
  ...baseDatafile,
  ...blankFields,
});

Factory.define('analysis', Analyses, {
  studyId: () => Factory.create('study')._id,
  name: () => faker.lorem.words(),
  desc: () => faker.lorem.paragraph(),
  type: 'custom',
  maxVisitGapDuration: 5000,
  minVisitDuration: 10000,
  ignoreOutsideImage: true,
  participantIds: [],
  stimulusIds: [],
});

Factory.define('analysisIso', Analyses, {
  studyId: () => Factory.create('study')._id,
  name: () => faker.lorem.words(),
  desc: () => faker.lorem.paragraph(),
  type: 'iso15007',
  minFixationDuration: 120,
  ignoreOutsideImage: true,
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
  name: faker.lorem.words(),
  studyId: Factory.create('study')._id,
  stimulusId: Factory.create('stimulus')._id,
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
  aoiId: () => Factory.create('aoi')._id,
  stimulusId: () => Factory.create('stimulus')._id,
  number: () => faker.random.number({ min: 1, max: 10 }),
  timestamp: (timestamp = faker.random.number(10000)),
  duration: (duration = faker.random.number(1000)),
  timestampEnd: timestamp + duration,
  combinedEventIndexStart: faker.random.number(100),
  combinedEventIndexEnd: faker.random.number(100),
});

const xs = [
  faker.random.number(1000),
  faker.random.number(1000),
  faker.random.number(1000),
  faker.random.number(1000),
  faker.random.number(1000),
];
const ys = [
  faker.random.number(1000),
  faker.random.number(1000),
  faker.random.number(1000),
  faker.random.number(1000),
  faker.random.number(1000),
];

Factory.define('eyeevent', Eyeevents, {
  studyId: (study = Factory.create('study'))._id,
  type: 'Fixation',
  participantId: (participant = Factory.create('participant', {
    studyId: study._id,
  }))._id,
  datafileId: (datafile = Factory.create('smiDatafile', {
    studyId: study._id,
    participantId: participant._id,
  }))._id,
  stimulusId: (stimulus = Factory.create('stimulus', { studyId: study._id }))
    ._id,
  aoiId: (aoi = Factory.create('aoi', {
    studyId: study._id,
    stimulusId: stimulus._id,
  }))._id,
  timestamp: faker.random.number(10000),
  duration: faker.random.number(1000),
  timestampEnd: faker.random.number(1000),
  eventIndex: faker.random.number(100),
  combinedEventIndex: faker.random.number(100),
  xs,
  ys,
  xMean: parseInt(jStat.mean(xs), 10),
  yMean: parseInt(jStat.mean(ys), 10),
});
