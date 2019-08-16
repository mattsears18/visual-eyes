import '../../factories.test';
import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

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

  // TODO - move this to getGlanceEndIndex()
  // it('has no stimulusId', () => {
  //   const analysis = Factory.create('analysis');

  //   const points = [
  //     { timestamp: 0 },
  //     { timestamp: 1000 },
  //     { timestamp: 2000 },
  //     { timestamp: 3000 },
  //   ];

  //   expect(() => {
  //     analysis.makeGlances({
  //       participantId: Factory.create('participant')._id,
  //       points,
  //     });
  //   }).to.throw('noStimulusId');
  // });

  // TODO - move this to getGlanceEndIndex()
  // it('has a nonexistent stimulus', () => {
  //   const analysis = Factory.create('analysis');
  //   expect(() => {
  //     analysis.makeGlances({
  //       participantId: Factory.create('participant')._id,
  //       stimulusId: 'abc',
  //       points: dummyPoints,
  //     });
  //   }).to.throw('noStimulusFound');
  // });

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
      minGlanceDuration: 5000,
      maxGlanceGapDuration: 2000,
      ignoreOutsideImage: false,
    });

    const points = [
      {
        x: 1,
        y: 1,
        timestamp: 0,
        stimulusId: stimulus._id,
      }, // start glance 1
      {
        x: 1,
        y: 1,
        timestamp: 1000,
        stimulusId: stimulus._id,
      },
      {
        x: 1,
        y: 1,
        timestamp: 2000,
        stimulusId: stimulus._id,
        fixationIndex: 1,
      },
      {
        x: 1,
        y: 1,
        timestamp: 3000,
        stimulusId: stimulus._id,
      },
      {
        x: 1,
        y: 1,
        timestamp: 5000,
        stimulusId: stimulus._id,
        fixationIndex: 2,
      }, // end glance 1
      {
        x: 1,
        y: 1,
        timestamp: 8000,
        stimulusId: stimulus._id,
      }, // exceeded maxGlanceGapDuration - end glance
      {
        x: 1,
        y: 1,
        timestamp: 9000,
        stimulusId: stimulus._id,
      }, // next point exceeds glance gap but minGlanceDuration not met, so no glance
      {
        x: 1,
        y: 1,
        timestamp: 14000,
        stimulusId: stimulus._id,
      }, // start glance 2
      {
        x: 1,
        y: 1,
        timestamp: 15000,
        stimulusId: stimulus._id,
      },
      {
        x: 1,
        y: 1,
        timestamp: 16000,
        stimulusId: stimulus._id,
      },
      {
        x: 1,
        y: 1,
        timestamp: 17000,
        stimulusId: stimulus._id,
      },
      {
        x: 1,
        y: 1,
        timestamp: 18000,
        stimulusId: stimulus._id,
      },
      {
        x: 1,
        y: 1,
        timestamp: 19000,
        stimulusId: stimulus._id,
      },
      {
        x: 1,
        y: 1,
        timestamp: 20000,
        stimulusId: stimulus._id,
      },
      {
        x: 1,
        y: 1,
        timestamp: 21000,
        stimulusId: stimulus._id,
      },
      {
        x: 1,
        y: 1,
        timestamp: 22000,
        stimulusId: stimulus._id,
      },
      {
        x: 1,
        y: 1,
        timestamp: 23000,
        stimulusId: stimulus._id,
      }, // end glance 2
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
      points,
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
