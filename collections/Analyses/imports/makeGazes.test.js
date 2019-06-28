require('./../../factories.test');
const { expect } = require('chai');

describe('Analyses.makeGazes()', () => {
  it('has no participantId', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeGazes({});
    }).to.throw('noParticipantId');
  });

  it('has a nonexistent participant', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeGazes({ participantId: 'abc' });
    }).to.throw('noParticipantFound');
  });

  it('has no stimulusId', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeGazes({
        participantId: Factory.create('participant')._id,
      });
    }).to.throw('noStimulusId');
  });

  it('has a nonexistent stimulus', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeGazes({
        participantId: Factory.create('participant')._id,
        stimulusId: 'abc',
      });
    }).to.throw('noStimulusFound');
  });

  it('makes 2 gazes', () => {
    const study = Factory.create('study');
    const datafile = Factory.create('imotionsDatafile', { studyId: study._id });
    const participant = Factory.create('participant', { studyId: study._id });
    const stimulus = Factory.create('stimulus', { studyId: study._id });
    const aoi = Factory.create('aoi', { stimulusId: stimulus._id });
    const analysis = Factory.create('analysis', {
      studyId: study._id,
      participantIds: [participant._id],
      stimulusIds: [stimulus._id],
      gazeGap: 2000,
      minGazeTime: 5000,
      ignoreOutsideImage: false,
    });

    const points = [
      { timestamp: 0 }, // start gaze 1
      { timestamp: 1000 },
      { timestamp: 2000, fixationIndex: 1 },
      { timestamp: 3000 },
      { timestamp: 5000, fixationIndex: 2 }, // end gaze 1
      { timestamp: 8000 }, // exceeded gazeGap - end gaze
      { timestamp: 9000 }, // next point exceeds gaze gap but mingazeTime not met, so no gaze
      { timestamp: 14000 }, // start gaze 2
      { timestamp: 15000 },
      { timestamp: 16000 },
      { timestamp: 17000 },
      { timestamp: 18000 },
      { timestamp: 19000 },
      { timestamp: 20000 },
      { timestamp: 21000 },
      { timestamp: 22000 },
      { timestamp: 23000 }, // end gaze 2
    ];

    points.forEach((point) => {
      Factory.create('gazepoint', {
        studyId: study._id,
        datafileId: datafile._id,
        aoiId: aoi._id,
        participantId: participant._id,
        stimulusId: stimulus._id,
        ...point,
        fileFormat: datafile.fileFormat,
      });
    });

    const gazeIds = analysis.makeGazes({
      participantId: participant._id,
      stimulusId: stimulus._id,
    });

    const gazes = Gazes.find({ analysisId: analysis._id }).fetch();

    expect(gazes.length).to.equal(2);

    expect(gazes[0].startTime).to.equal(0);
    expect(gazes[0].endTime).to.equal(5000);
    expect(gazes[0].number).to.equal(1);

    expect(gazes[1].startTime).to.equal(14000);
    expect(gazes[1].endTime).to.equal(23000);
    expect(gazes[1].number).to.equal(2);
  }).timeout(60000);
});
