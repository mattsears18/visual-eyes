import '../../factories.test';
import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Analyses.getVisitEndIndex()', () => {
  it('has has a startIndex that is too high', async () => {
    const analysis = Factory.create('analysis', {
      minVisitDuration: 10000,
      maxVisitGapDuration: 5000,
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
      minVisitDuration: 10000,
      maxVisitGapDuration: 500,
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
      minVisitDuration: 5000,
      maxVisitGapDuration: 5000,
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
      minVisitDuration: 5000,
      maxVisitGapDuration: 5000,
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

  describe('type !== iso15007', () => {
    it('gets the endIndex', async () => {
      const analysis = Factory.create('analysis', {
        minVisitDuration: 5000,
        maxVisitGapDuration: 5000,
      });

      const stimulus = Factory.create('stimulus');

      const fixations = [
        { timestamp: 0, timestampEnd: 500, stimulusId: stimulus._id },
        { timestamp: 1000, timestampEnd: 1500, stimulusId: stimulus._id },
        { timestamp: 2000, timestampEnd: 2500, stimulusId: stimulus._id },
        { timestamp: 3000, timestampEnd: 3500, stimulusId: stimulus._id },
        { timestamp: 4000, timestampEnd: 4500, stimulusId: stimulus._id },
        { timestamp: 5000, timestampEnd: 5500, stimulusId: stimulus._id },
        { timestamp: 6000, timestampEnd: 6500, stimulusId: stimulus._id },
        { timestamp: 7000, timestampEnd: 7500, stimulusId: stimulus._id },
        { timestamp: 8000, timestampEnd: 8500, stimulusId: stimulus._id },
        { timestamp: 9000, timestampEnd: 9500, stimulusId: stimulus._id },
      ];
      expect(analysis.getVisitEndIndex({ fixations })).to.equal(9);
    });
    it('exceeds the maxVisitGapDuration', async () => {
      const analysis = Factory.create('analysis', {
        type: 'custom',
        minVisitDuration: 3000,
        maxVisitGapDuration: 5000,
      });

      const stimulus = Factory.create('stimulus');

      const fixations = [
        { timestamp: 0, timestampEnd: 500, stimulusId: stimulus._id },
        { timestamp: 1000, timestampEnd: 1500, stimulusId: stimulus._id },
        { timestamp: 2000, timestampEnd: 2500, stimulusId: stimulus._id },
        { timestamp: 3000, timestampEnd: 3500, stimulusId: stimulus._id },
        { timestamp: 4000, timestampEnd: 4500, stimulusId: stimulus._id },
        { timestamp: 15000, timestampEnd: 5500, stimulusId: stimulus._id }, // 10500 ms gap!
        { timestamp: 16000, timestampEnd: 6500, stimulusId: stimulus._id },
      ];
      expect(analysis.getVisitEndIndex({ fixations })).to.equal(4);
    });
    it('exceeds maxVisitGapDuration but does not meet the minVisitDuration', async () => {
      const analysis = Factory.create('analysis', {
        type: 'custom',
        minVisitDuration: 10000,
        maxVisitGapDuration: 5000,
      });

      const stimulus = Factory.create('stimulus');

      const fixations = [
        { timestamp: 0, timestampEnd: 500, stimulusId: stimulus._id },
        { timestamp: 1000, timestampEnd: 1500, stimulusId: stimulus._id },
        { timestamp: 2000, timestampEnd: 2500, stimulusId: stimulus._id },
        { timestamp: 3000, timestampEnd: 3500, stimulusId: stimulus._id },
        { timestamp: 4000, timestampEnd: 4500, stimulusId: stimulus._id },
        { timestamp: 15000, timestampEnd: 15500, stimulusId: stimulus._id }, // exceeds MVGD
        { timestamp: 16000, timestampEnd: 16500, stimulusId: stimulus._id },
      ];

      expect(() => {
        analysis.getVisitEndIndex({ fixations });
      }).to.throw('minVisitDurationNotMet');
      try {
        analysis.getVisitEndIndex({ fixations });
      } catch (err) {
        expect(err.details.nextIndex).to.equal(5);
      }
    });

    it('ends on the last fixation matching the initial stimulus when the stimulus changes', async () => {
      const analysis = Factory.create('analysis', {
        type: 'custom',
        minVisitDuration: 3000,
        maxVisitGapDuration: 5000,
      });

      const stimulus = Factory.create('stimulus');
      const stimulus2 = Factory.create('stimulus');

      const fixations = [
        { timestamp: 0, timestampEnd: 500, stimulusId: stimulus._id },
        { timestamp: 1000, timestampEnd: 1500, stimulusId: stimulus._id },
        { timestamp: 2000, timestampEnd: 2500, stimulusId: stimulus._id },
        { timestamp: 3000, timestampEnd: 3500, stimulusId: stimulus._id },
        { timestamp: 4000, timestampEnd: 4500, stimulusId: stimulus._id },
        // stimulus changed and never went back
        { timestamp: 5000, timestampEnd: 5500, stimulusId: stimulus2._id },
        { timestamp: 6000, timestampEnd: 6500, stimulusId: stimulus2._id },
        { timestamp: 7000, timestampEnd: 7500, stimulusId: stimulus2._id },
      ];
      expect(analysis.getVisitEndIndex({ fixations })).to.equal(4);
    });

    it('can have a gap with fixations from another stimulus', async () => {
      const analysis = Factory.create('analysis', {
        type: 'custom',
        minVisitDuration: 3000,
        maxVisitGapDuration: 5000,
      });

      const stimulus = Factory.create('stimulus');
      const stimulus2 = Factory.create('stimulus');

      const fixations = [
        { timestamp: 0, timestampEnd: 500, stimulusId: stimulus._id },
        { timestamp: 1000, timestampEnd: 1500, stimulusId: stimulus._id },
        { timestamp: 2000, timestampEnd: 2500, stimulusId: stimulus._id },
        { timestamp: 3000, timestampEnd: 3500, stimulusId: stimulus._id },
        { timestamp: 4000, timestampEnd: 4500, stimulusId: stimulus._id },
        { timestamp: 5000, timestampEnd: 5500, stimulusId: stimulus2._id }, // 3500 ms gap
        { timestamp: 6000, timestampEnd: 6500, stimulusId: stimulus2._id }, // 3500 ms gap
        { timestamp: 7000, timestampEnd: 7500, stimulusId: stimulus2._id }, // 3500 ms gap
        { timestamp: 8000, timestampEnd: 8500, stimulusId: stimulus._id },
        { timestamp: 9000, timestampEnd: 9500, stimulusId: stimulus._id },
      ];
      expect(analysis.getVisitEndIndex({ fixations })).to.equal(9);
    });

    it('looks at another stimulus too long', async () => {
      const analysis = Factory.create('analysis', {
        type: 'custom',
        minVisitDuration: 3000,
        maxVisitGapDuration: 3000,
      });

      const stimulus = Factory.create('stimulus');
      const stimulus2 = Factory.create('stimulus');

      const fixations = [
        { timestamp: 0, timestampEnd: 500, stimulusId: stimulus._id },
        { timestamp: 1000, timestampEnd: 1500, stimulusId: stimulus._id },
        { timestamp: 2000, timestampEnd: 2500, stimulusId: stimulus._id },
        { timestamp: 3000, timestampEnd: 3500, stimulusId: stimulus._id },
        { timestamp: 4000, timestampEnd: 4500, stimulusId: stimulus._id },
        { timestamp: 5000, timestampEnd: 5500, stimulusId: stimulus2._id }, // 3500 ms gap
        { timestamp: 6000, timestampEnd: 6500, stimulusId: stimulus2._id }, // 3500 ms gap
        { timestamp: 7000, timestampEnd: 7500, stimulusId: stimulus2._id }, // 3500 ms gap
        { timestamp: 8000, timestampEnd: 8500, stimulusId: stimulus._id },
        { timestamp: 9000, timestampEnd: 9500, stimulusId: stimulus._id },
      ];
      expect(analysis.getVisitEndIndex({ fixations })).to.equal(4);
    });

    it('does not end if a fixation does not have a stimulus', () => {
      const analysis = Factory.create('analysis', {
        type: 'custom',
        minVisitDuration: 1000,
      });

      const stimulus1 = Factory.create('stimulus');

      const fixations = [
        { timestamp: 0, timestampEnd: 500, stimulusId: stimulus1._id },
        { timestamp: 1000, timestampEnd: 1500, stimulusId: stimulus1._id },
        { timestamp: 2000, timestampEnd: 2500, stimulusId: stimulus1._id },
        { timestamp: 3000, timestampEnd: 3500, stimulusId: stimulus1._id },
        { timestamp: 4000, timestampEnd: 4500, stimulusId: stimulus1._id },
        { timestamp: 5000, timestampEnd: 5500 },
        { timestamp: 6000, timestampEnd: 6500, stimulusId: stimulus1._id },
        { timestamp: 7000, timestampEnd: 7500, stimulusId: stimulus1._id },
        { timestamp: 8000, timestampEnd: 8500, stimulusId: stimulus1._id },
        { timestamp: 9000, timestampEnd: 9500, stimulusId: stimulus1._id },
      ];

      expect(analysis.getVisitEndIndex({ fixations })).to.equal(9);
    });
  });

  describe('type === iso15007', () => {
    it('has a large visit gap but thats okay!', () => {
      const analysis = Factory.create('analysis', {
        type: 'iso15007',
        minVisitDuration: 10000,
      });

      const stimulus = Factory.create('stimulus');

      const fixations = [
        { timestamp: 0, timestampEnd: 500, stimulusId: stimulus._id },
        { timestamp: 1000, timestampEnd: 1500, stimulusId: stimulus._id },
        { timestamp: 2000, timestampEnd: 2500, stimulusId: stimulus._id },
        { timestamp: 3000, timestampEnd: 3500, stimulusId: stimulus._id },
        { timestamp: 4000, timestampEnd: 4500, stimulusId: stimulus._id },
        { timestamp: 15000, timestampEnd: 15500, stimulusId: stimulus._id }, // 10,500ms gap - OK
        { timestamp: 16000, timestampEnd: 16500, stimulusId: stimulus._id },
        { timestamp: 17000, timestampEnd: 17500, stimulusId: stimulus._id },
        { timestamp: 18000, timestampEnd: 18500, stimulusId: stimulus._id },
        { timestamp: 19000, timestampEnd: 19500, stimulusId: stimulus._id },
      ];

      expect(analysis.getVisitEndIndex({ fixations })).to.equal(9);
    });
    it('ends when the stimulus changes', () => {
      const analysis = Factory.create('analysis', {
        type: 'iso15007',
        minVisitDuration: 1000,
      });

      const stimulus1 = Factory.create('stimulus');
      const stimulus2 = Factory.create('stimulus');

      const fixations = [
        { timestamp: 0, timestampEnd: 500, stimulusId: stimulus1._id },
        { timestamp: 1000, timestampEnd: 1500, stimulusId: stimulus1._id },
        { timestamp: 2000, timestampEnd: 2500, stimulusId: stimulus1._id },
        { timestamp: 3000, timestampEnd: 3500, stimulusId: stimulus1._id },
        { timestamp: 4000, timestampEnd: 4500, stimulusId: stimulus1._id },
        { timestamp: 5000, timestampEnd: 5500, stimulusId: stimulus2._id },
        { timestamp: 6000, timestampEnd: 6500, stimulusId: stimulus1._id },
        { timestamp: 7000, timestampEnd: 7500, stimulusId: stimulus1._id },
        { timestamp: 8000, timestampEnd: 8500, stimulusId: stimulus1._id },
        { timestamp: 9000, timestampEnd: 9500, stimulusId: stimulus1._id },
      ];

      expect(analysis.getVisitEndIndex({ fixations })).to.equal(4);
    });

    it('ends when a fixation does not have a stimulus', () => {
      const analysis = Factory.create('analysis', {
        type: 'iso15007',
        minVisitDuration: 1000,
      });

      const stimulus1 = Factory.create('stimulus');

      const fixations = [
        { timestamp: 0, timestampEnd: 500, stimulusId: stimulus1._id },
        { timestamp: 1000, timestampEnd: 1500, stimulusId: stimulus1._id },
        { timestamp: 2000, timestampEnd: 2500, stimulusId: stimulus1._id },
        { timestamp: 3000, timestampEnd: 3500, stimulusId: stimulus1._id },
        { timestamp: 4000, timestampEnd: 4500, stimulusId: stimulus1._id },
        { timestamp: 5000, timestampEnd: 5500 },
        { timestamp: 6000, timestampEnd: 6500, stimulusId: stimulus1._id },
        { timestamp: 7000, timestampEnd: 7500, stimulusId: stimulus1._id },
        { timestamp: 8000, timestampEnd: 8500, stimulusId: stimulus1._id },
        { timestamp: 9000, timestampEnd: 9500, stimulusId: stimulus1._id },
      ];

      expect(analysis.getVisitEndIndex({ fixations })).to.equal(4);
    });
  });
});
