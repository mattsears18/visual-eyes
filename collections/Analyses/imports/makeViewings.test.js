require('./../../factories.test');
const { expect } = require('chai');

describe('Analyses.makeViewings()', () => {
  it('has no participantId', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeViewings({});
    }).to.throw('noParticipantId');
  });

  it('has a nonexistent participant', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeViewings({ participantId: 'abc' });
    }).to.throw('noParticipantFound');
  });

  it('has no stimulusId', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeViewings({
        participantId: Factory.create('participant')._id,
      });
    }).to.throw('noStimulusId');
  });

  it('has a nonexistent stimulus', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeViewings({
        participantId: Factory.create('participant')._id,
        stimulusId: 'abc',
      });
    }).to.throw('noStimulusFound');
  });

  it('makes 2 viewings', () => {
    const study = Factory.create('study');
    const datafile = Factory.create('imotionsDatafile', { studyId: study._id });
    const participant = Factory.create('participant', { studyId: study._id });
    const stimulus = Factory.create('stimulus', { studyId: study._id });
    const aoi = Factory.create('aoi', { stimulusId: stimulus._id });
    const analysis = Factory.create('analysis', {
      studyId: study._id,
      participantIds: [participant._id],
      stimulusIds: [stimulus._id],
      viewingGap: 2000,
      minViewingTime: 5000,
      ignoreOutsideImage: false,
    });

    const points = [
      { timestamp: 0 }, // start viewing 1
      { timestamp: 1000 },
      { timestamp: 2000, fixationIndex: 1 },
      { timestamp: 3000 },
      { timestamp: 5000, fixationIndex: 2 }, // end viewing 1
      { timestamp: 8000 }, // exceeded viewingGap - end viewing
      { timestamp: 9000 }, // next point exceeds viewing gap but minviewingTime not met, so no viewing
      { timestamp: 14000 }, // start viewing 2
      { timestamp: 15000 },
      { timestamp: 16000 },
      { timestamp: 17000 },
      { timestamp: 18000 },
      { timestamp: 19000 },
      { timestamp: 20000 },
      { timestamp: 21000 },
      { timestamp: 22000 },
      { timestamp: 23000 }, // end viewing 2
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

    const viewingIds = analysis.makeViewings({
      participantId: participant._id,
      stimulusId: stimulus._id,
    });

    const viewings = Viewings.find({ analysisId: analysis._id }).fetch();

    expect(viewings.length).to.equal(2);

    expect(viewings[0].startTime).to.equal(0);
    expect(viewings[0].endTime).to.equal(5000);
    expect(viewings[0].number).to.equal(1);

    expect(viewings[1].startTime).to.equal(14000);
    expect(viewings[1].endTime).to.equal(23000);
    expect(viewings[1].number).to.equal(2);
  }).timeout(60000);
});
