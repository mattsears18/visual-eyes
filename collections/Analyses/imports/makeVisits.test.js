import '../../factories.test';
import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';
import Eyeevents from '../../Eyeevents/Eyeevents';

describe.only('Analyses.makeVisits()', () => {
  it('provides no fixations', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeVisits();
    }).to.throw('noEyeevents');

    expect(() => {
      analysis.makeVisits({});
    }).to.throw('noEyeevents');

    expect(() => {
      analysis.makeVisits({ eyeevents: [] });
    }).to.throw('noEyeevents');
  });

  it('has no participantId', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeVisits({ eyeevents: [{ type: 'fakeFixation' }] });
    }).to.throw('noParticipantId');
  });
  it('has a nonexistent participant', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeVisits({
        participantId: 'abc',
        eyeevents: [{ type: 'fakeFixation' }],
      });
    }).to.throw('noParticipantFound');
  });

  it('makes 2 visits', () => {
    const study = Factory.create('study');
    const participant = Factory.create('participant', { studyId: study._id });
    const datafile = Factory.create('imotionsDatafile', {
      studyId: study._id,
      participantId: participant._id,
    });
    const stimulus = Factory.create('stimulus', { studyId: study._id });
    const aoi = Factory.create('aoi', { stimulusId: stimulus._id });
    const analysis = Factory.create('analysis', {
      type: 'custom',
      studyId: study._id,
      participantIds: [participant._id],
      stimulusIds: [stimulus._id],
      minFixationDuration: null,
      minVisitDuration: 5000,
      maxVisitGapDuration: 2000,
      ignoreOutsideImage: false,
    });

    const rows = [
      { timestamp: 0, duration: 100 }, // start visit 1
      { timestamp: 1000, duration: 100 },
      { timestamp: 2000, duration: 100 },
      { timestamp: 3000, duration: 100 },
      { timestamp: 5000, duration: 100 }, // end visit 1 - next fixation exceeds maxVisitGapDuration
      { timestamp: 8000, duration: 100 }, // exceeded maxVisitGapDuration
      { timestamp: 9000, duration: 100 }, // next fixation exceeds maxVisitGapDuration but minVisitDuration not met, so no visit
      { timestamp: 14000, duration: 100 }, // start visit 2
      { timestamp: 15000, duration: 100 },
      { timestamp: 16000, duration: 100 },
      { timestamp: 17000, duration: 100 },
      { timestamp: 18000, duration: 100 },
      { timestamp: 19000, duration: 100 },
      { timestamp: 20000, duration: 100 },
      { timestamp: 21000, duration: 100 },
      { timestamp: 22000, duration: 100 },
      { timestamp: 23000, duration: 100 }, // end visit 2
    ];

    rows.forEach((row, ri) => {
      Factory.create('fixation', {
        studyId: study._id,
        datafileId: datafile._id,
        participantId: participant._id,
        stimulusId: stimulus._id,
        aoiId: aoi._id,
        combinedEventIndex: ri + 1,
        ...row,
      });
    });

    const fixations = Eyeevents.find(
      {
        participantId: participant._id,
        stimulusId: stimulus._id,
      },
      { sort: { timestamp: 1 } },
    ).fetch();

    const visitIds = analysis.makeVisits({
      participantId: participant._id,
      eyeevents: fixations,
    });

    expect(visitIds.length).to.equal(2);

    const visits = Visits.find(
      { analysisId: analysis._id },
      { sort: { timestamp: 1 } },
    ).fetch();

    expect(visits.length).to.equal(2);

    expect(visits[0].timestamp).to.equal(0);
    expect(visits[0].duration).to.equal(5100);
    expect(visits[0].number).to.equal(1);
    expect(visits[0].combinedEventIndexStart).to.equal(1);
    expect(visits[0].combinedEventIndexEnd).to.equal(5);

    expect(visits[1].timestamp).to.equal(14000);
    expect(visits[1].duration).to.equal(9100);
    expect(visits[1].number).to.equal(2);
    expect(visits[1].combinedEventIndexStart).to.equal(8);
    expect(visits[1].combinedEventIndexEnd).to.equal(17);
  });
});
