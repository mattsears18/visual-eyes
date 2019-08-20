import '../../factories.test';
import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Analyses.getGlanceEndIndex()', () => {
  it('has has a startIndex that is too high', async () => {
    const analysis = Factory.create('analysis', {
      minGlanceDuration: 10000,
      maxGlanceGapDuration: 5000,
    });

    const points = [
      { timestamp: 0 },
      { timestamp: 1000 },
      { timestamp: 2000 },
      { timestamp: 3000 },
      { timestamp: 4000 },
    ];
    expect(() => {
      analysis.getGlanceEndIndex({ gazepoints: points, startIndex: 4 });
    }).to.throw('startIndexTooHigh');
  });
  it('has no stimulusId', async () => {
    const analysis = Factory.create('analysis', {
      minGlanceDuration: 5000,
      maxGlanceGapDuration: 5000,
    });
    const points = [
      { timestamp: 0 },
      { timestamp: 1000 },
      { timestamp: 2000 },
      { timestamp: 3000 },
      { timestamp: 4000 },
      { timestamp: 5000 },
    ];
    expect(() => {
      analysis.getGlanceEndIndex({ gazepoints: points });
    }).to.throw('noStimulusId');
  });

  it('has a nonexistent stimulus', () => {
    const analysis = Factory.create('analysis', {
      minGlanceDuration: 5000,
      maxGlanceGapDuration: 5000,
    });

    const points = [
      { timestamp: 0, stimulusId: 'iGotAFakeIdDoe' },
      { timestamp: 1000, stimulusId: 'iGotAFakeIdDoe' },
      { timestamp: 2000, stimulusId: 'iGotAFakeIdDoe' },
      { timestamp: 3000, stimulusId: 'iGotAFakeIdDoe' },
      { timestamp: 4000, stimulusId: 'iGotAFakeIdDoe' },
      { timestamp: 5000, stimulusId: 'iGotAFakeIdDoe' },
    ];

    expect(() => {
      analysis.getGlanceEndIndex({ gazepoints: points });
    }).to.throw('noStimulusFound');
  });

  it('gets the endIndex', async () => {
    const analysis = Factory.create('analysis', {
      minGlanceDuration: 5000,
      maxGlanceGapDuration: 5000,
    });

    const stimulus = Factory.create('stimulus');

    const points = [
      { timestamp: 0, stimulusId: stimulus._id },
      { timestamp: 1000, stimulusId: stimulus._id },
      { timestamp: 2000, stimulusId: stimulus._id },
      { timestamp: 3000, stimulusId: stimulus._id },
      { timestamp: 4000, stimulusId: stimulus._id },
      { timestamp: 5000, stimulusId: stimulus._id },
      { timestamp: 6000, stimulusId: stimulus._id },
      { timestamp: 7000, stimulusId: stimulus._id },
      { timestamp: 8000, stimulusId: stimulus._id },
      { timestamp: 9000, stimulusId: stimulus._id },
    ];
    expect(analysis.getGlanceEndIndex({ gazepoints: points })).to.equal(9);
  });

  describe('type === custom', () => {
    it('exceeds the maxGlanceGapDuration', async () => {
      const analysis = Factory.create('analysis', {
        type: 'custom',
        minGlanceDuration: 3000,
        maxGlanceGapDuration: 5000,
      });

      const stimulus = Factory.create('stimulus');

      const points = [
        { timestamp: 0, stimulusId: stimulus._id },
        { timestamp: 1000, stimulusId: stimulus._id },
        { timestamp: 2000, stimulusId: stimulus._id },
        { timestamp: 3000, stimulusId: stimulus._id },
        { timestamp: 4000, stimulusId: stimulus._id },
        { timestamp: 15000, stimulusId: stimulus._id },
        { timestamp: 16000, stimulusId: stimulus._id },
        { timestamp: 17000, stimulusId: stimulus._id },
        { timestamp: 18000, stimulusId: stimulus._id },
        { timestamp: 19000, stimulusId: stimulus._id },
      ];
      expect(analysis.getGlanceEndIndex({ gazepoints: points })).to.equal(4);
    });
    it('exceeds maxGlanceGapDuration but does not meet the minGlanceDuration', async () => {
      const analysis = Factory.create('analysis', {
        type: 'custom',
        minGlanceDuration: 10000,
        maxGlanceGapDuration: 5000,
      });

      const stimulus = Factory.create('stimulus');

      const points = [
        { timestamp: 0, stimulusId: stimulus._id },
        { timestamp: 1000, stimulusId: stimulus._id },
        { timestamp: 2000, stimulusId: stimulus._id },
        { timestamp: 3000, stimulusId: stimulus._id },
        { timestamp: 4000, stimulusId: stimulus._id },
        { timestamp: 15000, stimulusId: stimulus._id },
        { timestamp: 16000, stimulusId: stimulus._id },
        { timestamp: 17000, stimulusId: stimulus._id },
        { timestamp: 18000, stimulusId: stimulus._id },
        { timestamp: 19000, stimulusId: stimulus._id },
      ];
      expect(() => {
        analysis.getGlanceEndIndex({ gazepoints: points });
      }).to.throw('minGlanceDurationNotMet');
      try {
        analysis.getGlanceEndIndex({ gazepoints: points });
      } catch (err) {
        expect(err.details.nextIndex).to.equal(5);
      }
    });

    it('can have a gap with gazepoints from another stimulus', async () => {
      const analysis = Factory.create('analysis', {
        type: 'custom',
        minGlanceDuration: 3000,
        maxGlanceGapDuration: 5000,
      });

      const stimulus = Factory.create('stimulus');

      const points = [
        { timestamp: 0, stimulusId: stimulus._id },
        { timestamp: 1000, stimulusId: stimulus._id },
        { timestamp: 2000, stimulusId: stimulus._id },
        { timestamp: 3000, stimulusId: stimulus._id },
        { timestamp: 4000, stimulusId: stimulus._id },
        { timestamp: 15000, stimulusId: stimulus._id },
        { timestamp: 16000, stimulusId: stimulus._id },
        { timestamp: 17000, stimulusId: stimulus._id },
        { timestamp: 18000, stimulusId: stimulus._id },
        { timestamp: 19000, stimulusId: stimulus._id },
      ];
      expect(analysis.getGlanceEndIndex({ gazepoints: points })).to.equal(4);
    });
  });
  describe('type === iso15007', () => {
    it('has a large glance gap but thats okay!', () => {
      const analysis = Factory.create('analysis', {
        type: 'iso15007',
        minGlanceDuration: 10000,
      });

      const stimulus = Factory.create('stimulus');

      const points = [
        { timestamp: 0, stimulusId: stimulus._id },
        { timestamp: 1000, stimulusId: stimulus._id },
        { timestamp: 2000, stimulusId: stimulus._id },
        { timestamp: 3000, stimulusId: stimulus._id },
        { timestamp: 4000, stimulusId: stimulus._id },
        { timestamp: 15000, stimulusId: stimulus._id },
        { timestamp: 16000, stimulusId: stimulus._id },
        { timestamp: 17000, stimulusId: stimulus._id },
        { timestamp: 18000, stimulusId: stimulus._id },
        { timestamp: 19000, stimulusId: stimulus._id },
      ];

      expect(analysis.getGlanceEndIndex({ gazepoints: points })).to.equal(9);
    });
    it('ends when the stimulus changes', () => {
      const analysis = Factory.create('analysis', {
        type: 'iso15007',
        minGlanceDuration: 1000,
      });

      const stimulus1 = Factory.create('stimulus');
      const stimulus2 = Factory.create('stimulus');

      const points = [
        { timestamp: 0, stimulusId: stimulus1._id },
        { timestamp: 1000, stimulusId: stimulus1._id },
        { timestamp: 2000, stimulusId: stimulus1._id },
        { timestamp: 3000, stimulusId: stimulus1._id },
        { timestamp: 4000, stimulusId: stimulus1._id },
        { timestamp: 5000, stimulusId: stimulus2._id },
        { timestamp: 6000, stimulusId: stimulus2._id },
        { timestamp: 7000, stimulusId: stimulus2._id },
        { timestamp: 8000, stimulusId: stimulus2._id },
        { timestamp: 9000, stimulusId: stimulus2._id },
      ];

      expect(analysis.getGlanceEndIndex({ gazepoints: points })).to.equal(4);
    });

    it.only('ends when a gazepoint does not have a stimulus', () => {
      const analysis = Factory.create('analysis', {
        type: 'iso15007',
        minGlanceDuration: 1000,
      });

      const stimulus1 = Factory.create('stimulus');

      const points = [
        { timestamp: 0, stimulusId: stimulus1._id },
        { timestamp: 1000, stimulusId: stimulus1._id },
        { timestamp: 2000, stimulusId: stimulus1._id },
        { timestamp: 3000, stimulusId: stimulus1._id },
        { timestamp: 4000, stimulusId: stimulus1._id },
        { timestamp: 5000 },
        { timestamp: 6000, stimulusId: stimulus1._id },
        { timestamp: 7000, stimulusId: stimulus1._id },
        { timestamp: 8000, stimulusId: stimulus1._id },
        { timestamp: 9000, stimulusId: stimulus1._id },
      ];

      expect(analysis.getGlanceEndIndex({ gazepoints: points })).to.equal(4);
    });
  });
});
