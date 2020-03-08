import '../../factories.test';
import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';
import Eyeevents from '../../Eyeevents/Eyeevents';

describe('Analyses.makeVisits()', () => {
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
    const stimulus = Factory.create('stimulus', {
      studyId: study._id,
      width: 1000,
      height: 1000,
    });
    const aoi1 = Factory.create('aoi', { stimulusId: stimulus._id });
    const aoi2 = Factory.create('aoi', { stimulusId: stimulus._id });

    const analysis = Factory.create('analysis', {
      type: 'custom',
      studyId: study._id,
      participantIds: [participant._id],
      stimulusIds: [stimulus._id],
      minFixationDuration: 120,
      minVisitDuration: 5000,
      maxOffStimulusFixations: 1,
    });

    const rows = [
      {
        timestamp: 0,
        timestampEnd: 100,
        aoiId: aoi1._id,
        xMean: 100,
        yMean: 0,
      }, // start visit 1
      {
        timestamp: 1000,
        timestampEnd: 1100,
        aoiId: aoi1._id,
        xMean: 200,
        yMean: 300,
      },
      {
        timestamp: 2000,
        timestampEnd: 2100,
        aoiId: aoi1._id,
        xMean: 300,
        yMean: 200,
      },
      {
        timestamp: 3000,
        timestampEnd: 3100,
        aoiId: aoi1._id,
        xMean: 100,
        yMean: 900,
      },
      {
        timestamp: 5000,
        timestampEnd: 5100,
        aoiId: aoi1._id,
        xMean: 900,
        yMean: 700,
      }, // end visit 1
      {
        timestamp: 8000,
        timestampEnd: 8100,
        aoiId: aoi2._id,
        xMean: 100,
        yMean: 500,
      }, // aoi changed
      {
        timestamp: 9000,
        timestampEnd: 9100,
        aoiId: aoi2._id,
        xMean: 300,
        yMean: 300,
      }, // minimumVisitDuration not met
      {
        timestamp: 14000,
        timestampEnd: 14100,
        aoiId: aoi1._id,
        xMean: 400,
        yMean: 100,
      }, // start visit 2
      {
        timestamp: 15000,
        timestampEnd: 15100,
        aoiId: aoi1._id,
        xMean: 700,
        yMean: 0,
      },
      {
        timestamp: 16000,
        timestampEnd: 16100,
        aoiId: aoi1._id,
        xMean: 800,
        yMean: 200,
      },
      {
        timestamp: 17000,
        timestampEnd: 17100,
        aoiId: aoi2._id,
        xMean: 100,
        yMean: 600,
      }, // acceptable gap
      {
        timestamp: 18000,
        timestampEnd: 18100,
        aoiId: aoi1._id,
        xMean: 0,
        yMean: 100,
      },
      {
        timestamp: 19000,
        timestampEnd: 19100,
        aoiId: aoi1._id,
        xMean: 300,
        yMean: 0,
      },
      {
        timestamp: 20000,
        timestampEnd: 20100,
        aoiId: aoi1._id,
        xMean: 800,
        yMean: 200,
      },
      {
        timestamp: 21000,
        timestampEnd: 21100,
        aoiId: aoi2._id,
        xMean: 900,
        yMean: 300,
      }, // acceptable gap
      {
        timestamp: 22000,
        timestampEnd: 22100,
        aoiId: aoi1._id,
        xMean: 200,
        yMean: 900,
      },
      {
        timestamp: 23000,
        timestampEnd: 23100,
        aoiId: aoi1._id,
        xMean: 300,
        yMean: 700,
      }, // end visit 2
      {
        timestamp: 24000,
        timestampEnd: 24100,
        aoiId: aoi2._id,
        xMean: 100,
        yMean: 400,
      }, // not included in visit
    ];

    rows.forEach((row, ri) => {
      Factory.create('eyeevent', {
        studyId: study._id,
        datafileId: datafile._id,
        participantId: participant._id,
        stimulusId: stimulus._id,
        index: ri + 1,
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
    expect(visits[0].timestampEnd).to.equal(5100);
    expect(visits[0].number).to.equal(1);
    expect(visits[0].fixationIndices).to.eql([1, 2, 3, 4, 5]);
    expect(visits[0].fixationCount).to.equal(5);
    expect(visits[0].fixationFrequency).to.equal((5 / 5100) * 1000);
    // expect(visits[0].fixationXs).to.eql([100, 200, 300, 100, 900]);
    // expect(visits[0].fixationYs).to.eql([0, 300, 200, 900, 700]);
    expect(visits[0].coverage).to.eql(0.36);

    expect(visits[1].timestamp).to.equal(14000);
    expect(visits[1].duration).to.equal(9100);
    expect(visits[1].timestampEnd).to.equal(23100);
    expect(visits[1].number).to.equal(2);
    expect(visits[1].fixationIndices).to.eql([8, 9, 10, 12, 13, 14, 16, 17]);
    expect(visits[1].fixationCount).to.equal(8);
    expect(visits[1].fixationFrequency).to.equal((8 / 9100) * 1000);
    // expect(visits[1].fixationXs).to.eql([400, 700, 800, 0, 300, 800, 200, 300]);
    // expect(visits[1].fixationYs).to.eql([100, 0, 200, 100, 0, 200, 900, 700]);
    expect(visits[1].coverage).to.eql(0.405);
  });
});
