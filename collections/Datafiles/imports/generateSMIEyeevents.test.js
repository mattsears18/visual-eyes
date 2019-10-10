import { Factory } from 'meteor/dburles:factory';

require('../../factories.test');
const { expect } = require('chai');

describe('Datafiles.generateSMIEyeevents', () => {
  it("doesn't pass any data", () => {
    const datafile = Factory.create('smiDatafile');
    expect(() => {
      datafile.generateSMIEyeevents();
    }).to.throw('noData');
  });

  it('generates eyeevents', () => {
    const datafile = Factory.create('smiDatafile');
    datafile.fileFormat = 'smi';

    const stimulus = Factory.create('stimulus', {
      name: 'ImageA',
      studyId: datafile.studyId,
      datafileIds: [datafile._id],
    });
    const aoi = Factory.create('aoi', {
      name: 'Image A',
      studyId: datafile.studyId,
      datafileIds: [datafile._id],
      stimulusId: stimulus._id,
    });

    const sortedRows = [
      { category: '-' },
      { category: 'User Event' },
      { originalEventIndex: '-' },
      // Begin first fixation
      {
        timestamp: 0,
        x: 100,
        y: 100,
        stimulusId: stimulus._id,
        aoiId: aoi._id,
        category: 'Visual Intake',
        originalEventIndex: 1,
      },
      {
        timestamp: 10,
        x: 200,
        y: 200,
        stimulusId: stimulus._id,
        aoiId: aoi._id,
        category: 'Visual Intake',
        originalEventIndex: 1,
      },
      {
        timestamp: 20,
        x: 300,
        y: 300,
        stimulusId: stimulus._id,
        aoiId: aoi._id,
        category: 'Visual Intake',
        originalEventIndex: 1,
      },
      // End first fixation
      // Begin first saccade
      {
        timestamp: 30,
        x: 300,
        y: 300,
        stimulusId: stimulus._id,
        aoiId: aoi._id,
        category: 'Saccade',
        originalEventIndex: 1,
      },
      {
        timestamp: 40,
        x: 100,
        y: 100,
        stimulusId: stimulus._id,
        aoiId: aoi._id,
        category: 'Saccade',
        originalEventIndex: 1,
      },
      // End saccade
      // Fixation 2
      {
        timestamp: 50,
        x: 300,
        y: 300,
        stimulusId: stimulus._id,
        aoiId: aoi._id,
        category: 'Visual Intake',
        originalEventIndex: 2,
      },
      // End fixation
      // Blink 1
      {
        timestamp: 60,
        x: 300,
        y: 300,
        stimulusId: stimulus._id,
        aoiId: aoi._id,
        category: 'Blink',
        originalEventIndex: 2,
      },
      {
        timestamp: 70,
        x: 200,
        y: 200,
        stimulusId: stimulus._id,
        aoiId: aoi._id,
        category: 'Blink',
        originalEventIndex: 2,
      },
    ];

    expect(datafile.generateSMIEyeevents(sortedRows)).to.eql([
      {
        timestamp: 0,
        index: 1,
        originalEventIndex: 1,
        xs: [100, 200, 300],
        ys: [100, 200, 300],
        stimulusId: stimulus._id,
        aoiId: aoi._id,
        type: 'Fixation',
        xMean: 200,
        yMean: 200,
        duration: 20,
      },
      {
        timestamp: 30,
        index: 2,
        originalEventIndex: 1,
        xs: [300, 100],
        ys: [300, 100],
        stimulusId: stimulus._id,
        aoiId: aoi._id,
        type: 'Saccade',
        xMean: 200,
        yMean: 200,
        duration: 10,
      },
      {
        timestamp: 50,
        index: 3,
        originalEventIndex: 2,
        xs: [300],
        ys: [300],
        stimulusId: stimulus._id,
        aoiId: aoi._id,
        type: 'Fixation',
        xMean: 300,
        yMean: 300,
        duration: 0,
      },
      {
        timestamp: 60,
        index: 4,
        originalEventIndex: 2,
        xs: [300, 200],
        ys: [300, 200],
        stimulusId: stimulus._id,
        aoiId: aoi._id,
        type: 'Blink',
        xMean: 250,
        yMean: 250,
        duration: 10,
      },
    ]);
  });
});
