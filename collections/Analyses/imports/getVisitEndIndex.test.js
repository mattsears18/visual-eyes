import '../../factories.test';
import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Analyses.getVisitEndIndex()', () => {
  it('has a startIndex that is too high', async () => {
    const analysis = Factory.create('analysis', {
      minFixationDuration: 120,
      minVisitDuration: 10000,
      maxOffTargetFixations: 5000,
    });

    const fixations = [
      { timestamp: 0 },
      { timestamp: 1000 },
      { timestamp: 2000 },
      { timestamp: 3000 },
      { timestamp: 4000 },
    ];
    expect(() => {
      analysis.getVisitEndIndex({ fixations, startIndex: 4 });
    }).to.throw(/^startIndexTooHigh$/);
  });

  it('does not have a timestamp and timestampEnd for every fixation', () => {
    const analysis = Factory.create('analysis', {
      minFixationDuration: 120,
      minVisitDuration: 10000,
      maxOffTargetFixations: 500,
    });

    const fixations = [
      { timestamp: 0 },
      { timestamp: 1000, timestampEnd: 1500 },
      { timestamp: 2000, timestampEnd: 2500 },
      { timestamp: 3000, timestampEnd: 3500 },
      { timestamp: 4000, timestampEnd: 4500 },
    ];
    expect(() => {
      analysis.getVisitEndIndex({ fixations, startIndex: 0 });
    }).to.throw(/^missingTimestampOrTimestampEnd$/);

    const fixations2 = [
      { timestamp: 0, timestampEnd: 500 },
      { timestamp: 1000, timestampEnd: 1500 },
      { timestampEnd: 2500 },
      { timestamp: 3000, timestampEnd: 3500 },
      { timestamp: 4000, timestampEnd: 4500 },
    ];
    expect(() => {
      analysis.getVisitEndIndex({ fixations: fixations2, startIndex: 0 });
    }).to.throw(/^missingTimestampOrTimestampEnd$/);
  });

  it('has no stimulusId', async () => {
    const analysis = Factory.create('analysis', {
      minFixationDuration: 120,
      minVisitDuration: 5000,
      maxOffTargetFixations: 5000,
    });
    const fixations = [
      { timestamp: 0, timestampEnd: 500 },
      { timestamp: 1000, timestampEnd: 1500 },
      { timestamp: 2000, timestampEnd: 2500 },
      { timestamp: 3000, timestampEnd: 3500 },
      { timestamp: 4000, timestampEnd: 4500 },
      { timestamp: 5000, timestampEnd: 5500 },
    ];
    expect(() => {
      analysis.getVisitEndIndex({ fixations });
    }).to.throw(/^noStimulusId$/);
  });

  it('has a nonexistent stimulus', () => {
    const analysis = Factory.create('analysis', {
      minFixationDuration: 120,
      minVisitDuration: 5000,
      maxOffTargetFixations: 5000,
    });

    const fixations = [
      { timestamp: 0, timestampEnd: 500, stimulusId: 'iGotAFakeIdDoe' },
      { timestamp: 1000, timestampEnd: 1500, stimulusId: 'iGotAFakeIdDoe' },
      { timestamp: 2000, timestampEnd: 2500, stimulusId: 'iGotAFakeIdDoe' },
      { timestamp: 3000, timestampEnd: 3500, stimulusId: 'iGotAFakeIdDoe' },
      { timestamp: 4000, timestampEnd: 4500, stimulusId: 'iGotAFakeIdDoe' },
      { timestamp: 5000, timestampEnd: 5500, stimulusId: 'iGotAFakeIdDoe' },
    ];

    expect(() => {
      analysis.getVisitEndIndex({ fixations });
    }).to.throw(/^noStimulusFound$/);
  });

  it('has no aoiId', async () => {
    const analysis = Factory.create('analysis', {
      minFixationDuration: 120,
      minVisitDuration: 5000,
      maxOffTargetFixations: 5000,
    });

    const stimulus = Factory.create('stimulus');

    const fixations = [
      { timestamp: 0, timestampEnd: 500, stimulusId: stimulus._id },
      { timestamp: 1000, timestampEnd: 1500, stimulusId: stimulus._id },
      { timestamp: 2000, timestampEnd: 2500, stimulusId: stimulus._id },
      { timestamp: 3000, timestampEnd: 3500, stimulusId: stimulus._id },
      { timestamp: 4000, timestampEnd: 4500, stimulusId: stimulus._id },
      { timestamp: 5000, timestampEnd: 5500, stimulusId: stimulus._id },
    ];

    expect(() => {
      analysis.getVisitEndIndex({ fixations });
    }).to.throw(/^noAoiId$/);
  });

  it('has a nonexistent aoi', () => {
    const analysis = Factory.create('analysis', {
      minFixationDuration: 120,
      minVisitDuration: 5000,
      maxOffTargetFixations: 5000,
    });

    const stimulus = Factory.create('stimulus');

    const fixations = [
      {
        timestamp: 0,
        timestampEnd: 500,
        stimulusId: stimulus._id,
        aoiId: 'fakeId',
      },
      {
        timestamp: 1000,
        timestampEnd: 1500,
        stimulusId: stimulus._id,
        aoiId: 'fakeId',
      },
      {
        timestamp: 2000,
        timestampEnd: 2500,
        stimulusId: stimulus._id,
        aoiId: 'fakeId',
      },
      {
        timestamp: 3000,
        timestampEnd: 3500,
        stimulusId: stimulus._id,
        aoiId: 'fakeId',
      },
      {
        timestamp: 4000,
        timestampEnd: 4500,
        stimulusId: stimulus._id,
        aoiId: 'fakeId',
      },
      {
        timestamp: 5000,
        timestampEnd: 5500,
        stimulusId: stimulus._id,
        aoiId: 'fakeId',
      },
    ];

    expect(() => {
      analysis.getVisitEndIndex({ fixations });
    }).to.throw(/^noAoiFound$/);
  });

  it('has a "blank" initial stimulus', () => {
    const analysis = Factory.create('analysis', {
      minFixationDuration: 120,
      minVisitDuration: 1000,
      maxOffTargetFixations: 0,
    });

    const blankStimulus = Factory.create('stimulus', { name: '-' });
    const blankAoi = Factory.create('aoi', {
      name: '-',
      stimulusId: blankStimulus._id,
    });

    const fixations = [
      {
        timestamp: 1000,
        timestampEnd: 1200,
        stimulusId: blankStimulus._id,
        aoiId: blankAoi._id,
      },
      {
        timestamp: 1200,
        timestampEnd: 1400,
        stimulusId: blankStimulus._id,
        aoiId: blankAoi._id,
      },
      {
        timestamp: 1400,
        timestampEnd: 1600,
        stimulusId: blankStimulus._id,
        aoiId: blankAoi._id,
      },
    ];

    expect(() => {
      analysis.getVisitEndIndex({ fixations, startIndex: 0 });
    }).to.throw(/^blankInitialStimulus$/);
  });

  it('ends when the aoi changes', () => {
    const analysis = Factory.create('analysis', {
      minFixationDuration: 120,
      minVisitDuration: 1000,
      maxOffTargetFixations: 0,
    });

    const stimulus = Factory.create('stimulus');
    const aoi1 = Factory.create('aoi', { stimulusId: stimulus._id });
    const aoi2 = Factory.create('aoi', { stimulusId: stimulus._id });

    const fixations = [
      {
        timestamp: 0,
        timestampEnd: 500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 1000,
        timestampEnd: 1500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 2000,
        timestampEnd: 2500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 3000,
        timestampEnd: 3500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 4000,
        timestampEnd: 4500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 5000,
        timestampEnd: 5500,
        stimulusId: stimulus._id,
        aoiId: aoi2._id,
      },
      {
        timestamp: 6000,
        timestampEnd: 6500,
        stimulusId: stimulus._id,
        aoiId: aoi2._id,
      },
      {
        timestamp: 7000,
        timestampEnd: 7500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 8000,
        timestampEnd: 8500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 9000,
        timestampEnd: 9500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
    ];

    expect(analysis.getVisitEndIndex({ fixations })).to.equal(4);
  });

  it("has an acceptable gap but doesn't meet the minimum visit duration", () => {
    const analysis = Factory.create('analysis', {
      minFixationDuration: 120,
      minVisitDuration: 10000,
      maxOffTargetFixations: 2,
    });

    const stimulus = Factory.create('stimulus');
    const aoi1 = Factory.create('aoi', { stimulusId: stimulus._id });
    const aoi2 = Factory.create('aoi', { stimulusId: stimulus._id });

    const fixations = [
      {
        timestamp: 0,
        timestampEnd: 500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 1000,
        timestampEnd: 1500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 2000,
        timestampEnd: 2500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 3000,
        timestampEnd: 3500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 4000,
        timestampEnd: 4500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 5000,
        timestampEnd: 5500,
        stimulusId: stimulus._id,
        aoiId: aoi2._id,
      },
      {
        timestamp: 6000,
        timestampEnd: 6500,
        stimulusId: stimulus._id,
        aoiId: aoi2._id,
      },
      {
        timestamp: 7000,
        timestampEnd: 7500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 8000,
        timestampEnd: 8500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 9000,
        timestampEnd: 9500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
    ];

    expect(() => {
      analysis.getVisitEndIndex({ fixations });
    }).to.throw(/^minVisitDurationNotMet$/);
  });

  it('has an acceptable gap and meets the minimum visit duration', () => {
    const analysis = Factory.create('analysis', {
      minFixationDuration: 120,
      minVisitDuration: 5000,
      maxOffTargetFixations: 2,
    });

    const stimulus = Factory.create('stimulus');
    const aoi1 = Factory.create('aoi', { stimulusId: stimulus._id });
    const aoi2 = Factory.create('aoi', { stimulusId: stimulus._id });

    const fixations = [
      {
        timestamp: 0,
        timestampEnd: 500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 1000,
        timestampEnd: 1500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 2000,
        timestampEnd: 2500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 3000,
        timestampEnd: 3500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 4000,
        timestampEnd: 4500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 5000,
        timestampEnd: 5500,
        stimulusId: stimulus._id,
        aoiId: aoi2._id,
      },
      {
        timestamp: 6000,
        timestampEnd: 6500,
        stimulusId: stimulus._id,
        aoiId: aoi2._id,
      },
      {
        timestamp: 7000,
        timestampEnd: 7500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 8000,
        timestampEnd: 8500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 9000,
        timestampEnd: 9500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
    ];

    expect(analysis.getVisitEndIndex({ fixations })).to.equal(9);
  });
  it('has an unacceptable gap but still makes a visit', () => {
    const analysis = Factory.create('analysis', {
      minFixationDuration: 120,
      minVisitDuration: 4000,
      maxOffTargetFixations: 1,
    });

    const stimulus = Factory.create('stimulus');
    const aoi1 = Factory.create('aoi', { stimulusId: stimulus._id });
    const aoi2 = Factory.create('aoi', { stimulusId: stimulus._id });

    const fixations = [
      {
        timestamp: 0,
        timestampEnd: 500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 1000,
        timestampEnd: 1500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 2000,
        timestampEnd: 2500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 3000,
        timestampEnd: 3500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 4000,
        timestampEnd: 4500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 5000,
        timestampEnd: 5500,
        stimulusId: stimulus._id,
        aoiId: aoi2._id,
      },
      {
        timestamp: 6000,
        timestampEnd: 6500,
        stimulusId: stimulus._id,
        aoiId: aoi2._id,
      },
      {
        timestamp: 7000,
        timestampEnd: 7500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 8000,
        timestampEnd: 8500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
      {
        timestamp: 9000,
        timestampEnd: 9500,
        stimulusId: stimulus._id,
        aoiId: aoi1._id,
      },
    ];

    expect(analysis.getVisitEndIndex({ fixations })).to.equal(4);
  });
});
