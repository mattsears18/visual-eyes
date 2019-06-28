require('./../../factories.test');
const { expect } = require('chai');

describe('Analyses.makeGlances()', () => {
  it('has no participantId', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeGlances({});
    }).to.throw('noParticipantId');
  });

  it('has a nonexistent participant', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeGlances({ participantId: 'abc' });
    }).to.throw('noParticipantFound');
  });

  it('has no stimulusId', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeGlances({
        participantId: Factory.create('participant')._id,
      });
    }).to.throw('noStimulusId');
  });

  it('has a nonexistent stimulus', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeGlances({
        participantId: Factory.create('participant')._id,
        stimulusId: 'abc',
      });
    }).to.throw('noStimulusFound');
  });

  it('makes 2 glances', () => {
    const study = Factory.create('study');
    const datafile = Factory.create('imotionsDatafile', { studyId: study._id });
    const participant = Factory.create('participant', { studyId: study._id });
    const stimulus = Factory.create('stimulus', { studyId: study._id });
    const aoi = Factory.create('aoi', { stimulusId: stimulus._id });
    const analysis = Factory.create('analysis', {
      studyId: study._id,
      participantIds: [participant._id],
      stimulusIds: [stimulus._id],
      glanceGap: 2000,
      minGlanceTime: 5000,
      ignoreOutsideImage: false,
    });

    const points = [
      { timestamp: 0 }, // start glance 1
      { timestamp: 1000 },
      { timestamp: 2000, fixationIndex: 1 },
      { timestamp: 3000 },
      { timestamp: 5000, fixationIndex: 2 }, // end glance 1
      { timestamp: 8000 }, // exceeded glanceGap - end glance
      { timestamp: 9000 }, // next point exceeds glance gap but minglanceTime not met, so no glance
      { timestamp: 14000 }, // start glance 2
      { timestamp: 15000 },
      { timestamp: 16000 },
      { timestamp: 17000 },
      { timestamp: 18000 },
      { timestamp: 19000 },
      { timestamp: 20000 },
      { timestamp: 21000 },
      { timestamp: 22000 },
      { timestamp: 23000 }, // end glance 2
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

    const glanceIds = analysis.makeGlances({
      participantId: participant._id,
      stimulusId: stimulus._id,
    });

    const glances = Glances.find({ analysisId: analysis._id }).fetch();

    expect(glances.length).to.equal(2);

    expect(glances[0].startTime).to.equal(0);
    expect(glances[0].endTime).to.equal(5000);
    expect(glances[0].number).to.equal(1);

    expect(glances[1].startTime).to.equal(14000);
    expect(glances[1].endTime).to.equal(23000);
    expect(glances[1].number).to.equal(2);
  }).timeout(60000);
});
