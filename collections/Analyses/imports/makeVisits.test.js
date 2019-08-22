import '../../factories.test';
import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Analyses.makeVisits()', () => {
  it('has no participantId', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeVisits({});
    }).to.throw('noParticipantId');
  });
  it('has a nonexistent participant', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeVisits({ participantId: 'abc' });
    }).to.throw('noParticipantFound');
  });

  it('makes 2 visits', () => {
    const study = Factory.create('study');
    const datafile = Factory.create('imotionsDatafile', { studyId: study._id });
    const participant = Factory.create('participant', { studyId: study._id });
    const stimulus = Factory.create('stimulus', { studyId: study._id });
    const aoi = Factory.create('aoi', { stimulusId: stimulus._id });
    const analysis = Factory.create('analysis', {
      studyId: study._id,
      participantIds: [participant._id],
      stimulusIds: [stimulus._id],
      minVisitDuration: 5000,
      maxVisitGapDuration: 2000,
      ignoreOutsideImage: false,
    });

    const points = [
      {
        x: 1,
        y: 1,
        timestamp: 0,
        stimulusId: stimulus._id,
      }, // start visit 1
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
        eventIndex: 1,
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
        eventIndex: 2,
      }, // end visit 1
      {
        x: 1,
        y: 1,
        timestamp: 8000,
        stimulusId: stimulus._id,
      }, // exceeded maxVisitGapDuration - end visit
      {
        x: 1,
        y: 1,
        timestamp: 9000,
        stimulusId: stimulus._id,
      }, // next point exceeds visit gap but minVisitDuration not met, so no visit
      {
        x: 1,
        y: 1,
        timestamp: 14000,
        stimulusId: stimulus._id,
      }, // start visit 2
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
      }, // end visit 2
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

    const visitIds = analysis.makeVisits({
      participantId: participant._id,
      stimulusId: stimulus._id,
      points,
    });

    const visits = Visits.find({ analysisId: analysis._id }).fetch();

    expect(visits.length).to.equal(2);

    expect(visits[0].startTime).to.equal(0);
    expect(visits[0].endTime).to.equal(5000);
    expect(visits[0].number).to.equal(1);

    expect(visits[1].startTime).to.equal(14000);
    expect(visits[1].endTime).to.equal(23000);
    expect(visits[1].number).to.equal(2);
  }).timeout(60000);
});
