import '../../factories.test';
import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Analyses.getVisitEndIndex()', () => {
  it('has has a startIndex that is too high', async () => {
    const analysis = Factory.create('analysis', {
      minVisitDuration: 10000,
      maxVisitGapDuration: 5000,
    });

    const points = [
      { timestamp: 0 },
      { timestamp: 1000 },
      { timestamp: 2000 },
      { timestamp: 3000 },
      { timestamp: 4000 },
    ];
    expect(() => {
      analysis.getVisitEndIndex({ gazepoints: points, startIndex: 4 });
    }).to.throw('startIndexTooHigh');
  });
  it('has no stimulusId', async () => {
    const analysis = Factory.create('analysis', {
      minVisitDuration: 5000,
      maxVisitGapDuration: 5000,
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
      analysis.getVisitEndIndex({ gazepoints: points });
    }).to.throw('noStimulusId');
  });

  it('has a nonexistent stimulus', () => {
    const analysis = Factory.create('analysis', {
      minVisitDuration: 5000,
      maxVisitGapDuration: 5000,
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
      analysis.getVisitEndIndex({ gazepoints: points });
    }).to.throw('noStimulusFound');
  });

  describe('type !== iso15007', () => {
    it('gets the endIndex', async () => {
      const analysis = Factory.create('analysis', {
        minVisitDuration: 5000,
        maxVisitGapDuration: 5000,
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
      expect(analysis.getVisitEndIndex({ gazepoints: points })).to.equal(9);
    });
    it('exceeds the maxVisitGapDuration', async () => {
      const analysis = Factory.create('analysis', {
        type: 'custom',
        minVisitDuration: 3000,
        maxVisitGapDuration: 5000,
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
      expect(analysis.getVisitEndIndex({ gazepoints: points })).to.equal(4);
    });
    it('exceeds maxVisitGapDuration but does not meet the minVisitDuration', async () => {
      const analysis = Factory.create('analysis', {
        type: 'custom',
        minVisitDuration: 10000,
        maxVisitGapDuration: 5000,
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
        analysis.getVisitEndIndex({ gazepoints: points });
      }).to.throw('minVisitDurationNotMet');
      try {
        analysis.getVisitEndIndex({ gazepoints: points });
      } catch (err) {
        expect(err.details.nextIndex).to.equal(5);
      }
    });

    it('can have a gap with gazepoints from another stimulus', async () => {
      const analysis = Factory.create('analysis', {
        type: 'custom',
        minVisitDuration: 3000,
        maxVisitGapDuration: 5000,
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
      expect(analysis.getVisitEndIndex({ gazepoints: points })).to.equal(4);
    });
  });

  describe('type === iso15007', () => {
    it('has a large visit gap but thats okay!', () => {
      const analysis = Factory.create('analysis', {
        type: 'iso15007',
        minVisitDuration: 10000,
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

      expect(analysis.getVisitEndIndex({ gazepoints: points })).to.equal(9);
    });
    it('ends when the stimulus changes', () => {
      const analysis = Factory.create('analysis', {
        type: 'iso15007',
        minVisitDuration: 1000,
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

      expect(analysis.getVisitEndIndex({ gazepoints: points })).to.equal(4);
    });

    it('ends when a gazepoint does not have a stimulus', () => {
      const analysis = Factory.create('analysis', {
        type: 'iso15007',
        minVisitDuration: 1000,
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

      expect(analysis.getVisitEndIndex({ gazepoints: points })).to.equal(4);
    });
  });
});
