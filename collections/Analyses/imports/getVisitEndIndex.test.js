import '../../factories.test';
import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Analyses.getVisitEndIndex()', () => {
  it('has a startIndex that is too high', async () => {
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

  it('does not have a timestamp and duration for every fixation', () => {
    const analysis = Factory.create('analysis', {
      minVisitDuration: 10000,
      maxVisitGapDuration: 500,
    });

    const fixations = [
      { timestamp: 0 },
      { timestamp: 1000, duration: 500 },
      { timestamp: 2000, duration: 500 },
      { timestamp: 3000, duration: 500 },
      { timestamp: 4000, duration: 500 },
    ];
    expect(() => {
      analysis.getVisitEndIndex({ fixations, startIndex: 0 });
    }).to.throw(/^missingTimestampOrDuration$/);

    const fixations2 = [
      { timestamp: 0, duration: 500 },
      { timestamp: 1000, duration: 500 },
      { duration: 500 },
      { timestamp: 3000, duration: 500 },
      { timestamp: 4000, duration: 500 },
    ];
    expect(() => {
      analysis.getVisitEndIndex({ fixations: fixations2, startIndex: 0 });
    }).to.throw(/^missingTimestampOrDuration$/);
  });

  it('has no stimulusId', async () => {
    const analysis = Factory.create('analysis', {
      minVisitDuration: 5000,
      maxVisitGapDuration: 5000,
    });
    const fixations = [
      { timestamp: 0, duration: 500 },
      { timestamp: 1000, duration: 500 },
      { timestamp: 2000, duration: 500 },
      { timestamp: 3000, duration: 500 },
      { timestamp: 4000, duration: 500 },
      { timestamp: 5000, duration: 500 },
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
      { timestamp: 0, duration: 500, stimulusId: 'iGotAFakeIdDoe' },
      { timestamp: 1000, duration: 500, stimulusId: 'iGotAFakeIdDoe' },
      { timestamp: 2000, duration: 500, stimulusId: 'iGotAFakeIdDoe' },
      { timestamp: 3000, duration: 500, stimulusId: 'iGotAFakeIdDoe' },
      { timestamp: 4000, duration: 500, stimulusId: 'iGotAFakeIdDoe' },
      { timestamp: 5000, duration: 500, stimulusId: 'iGotAFakeIdDoe' },
    ];

    expect(() => {
      analysis.getVisitEndIndex({ fixations });
    }).to.throw(/^noStimulusFound$/);
  });

  it('has no aoiId', async () => {
    const analysis = Factory.create('analysis', {
      minVisitDuration: 5000,
      maxVisitGapDuration: 5000,
    });

    const stimulus = Factory.create('stimulus');

    const fixations = [
      { timestamp: 0, duration: 500, stimulusId: stimulus._id },
      { timestamp: 1000, duration: 500, stimulusId: stimulus._id },
      { timestamp: 2000, duration: 500, stimulusId: stimulus._id },
      { timestamp: 3000, duration: 500, stimulusId: stimulus._id },
      { timestamp: 4000, duration: 500, stimulusId: stimulus._id },
      { timestamp: 5000, duration: 500, stimulusId: stimulus._id },
    ];

    expect(() => {
      analysis.getVisitEndIndex({ fixations });
    }).to.throw(/^noAoiId$/);
  });

  it('has a nonexistent aoi', () => {
    const analysis = Factory.create('analysis', {
      minVisitDuration: 5000,
      maxVisitGapDuration: 5000,
    });

    const stimulus = Factory.create('stimulus');

    const fixations = [
      {
        timestamp: 0,
        duration: 500,
        stimulusId: stimulus._id,
        aoiId: 'fakeId',
      },
      {
        timestamp: 1000,
        duration: 500,
        stimulusId: stimulus._id,
        aoiId: 'fakeId',
      },
      {
        timestamp: 2000,
        duration: 500,
        stimulusId: stimulus._id,
        aoiId: 'fakeId',
      },
      {
        timestamp: 3000,
        duration: 500,
        stimulusId: stimulus._id,
        aoiId: 'fakeId',
      },
      {
        timestamp: 4000,
        duration: 500,
        stimulusId: stimulus._id,
        aoiId: 'fakeId',
      },
      {
        timestamp: 5000,
        duration: 500,
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
      type: 'iso15007',
      minVisitDuration: 1000,
    });

    const blankStimulus = Factory.create('stimulus', { name: '-' });
    const blankAoi = Factory.create('aoi', {
      name: '-',
      stimulusId: blankStimulus._id,
    });

    const fixations = [
      {
        timestamp: 1000,
        duration: 200,
        stimulusId: blankStimulus._id,
        aoiId: blankAoi._id,
      },
      {
        timestamp: 1200,
        duration: 200,
        stimulusId: blankStimulus._id,
        aoiId: blankAoi._id,
      },
      {
        timestamp: 1400,
        duration: 200,
        stimulusId: blankStimulus._id,
        aoiId: blankAoi._id,
      },
    ];

    expect(() => {
      analysis.getVisitEndIndex({ fixations, startIndex: 0 });
    }).to.throw(/^blankInitialStimulus$/);
  });

  describe('type === iso15007', () => {
    it('has a large visit gap but thats okay!', () => {
      const analysis = Factory.create('analysis', {
        type: 'iso15007',
        minVisitDuration: 10000,
      });

      const stimulus = Factory.create('stimulus');
      const aoi = Factory.create('aoi', { stimulusId: stimulus._id });

      const fixations = [
        {
          timestamp: 0,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 1000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 2000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 3000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 4000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 15000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        }, // 10,500ms gap - OK
        {
          timestamp: 16000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 17000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 18000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 19000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
      ];

      expect(analysis.getVisitEndIndex({ fixations })).to.equal(9);
    });
    it('ends when the aoi changes', () => {
      const analysis = Factory.create('analysis', {
        type: 'iso15007',
        minVisitDuration: 1000,
      });

      const stimulus = Factory.create('stimulus');
      const aoi1 = Factory.create('aoi', { stimulusId: stimulus._id });
      const aoi2 = Factory.create('aoi', { stimulusId: stimulus._id });

      const fixations = [
        {
          timestamp: 0,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 1000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 2000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 3000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 4000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 5000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi2._id,
        },
        {
          timestamp: 6000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 7000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 8000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 9000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
      ];

      expect(analysis.getVisitEndIndex({ fixations })).to.equal(4);
    });

    it('ends when a fixation does not have a aoi', () => {
      const analysis = Factory.create('analysis', {
        type: 'iso15007',
        minVisitDuration: 1000,
      });

      const stimulus = Factory.create('stimulus');
      const aoi1 = Factory.create('aoi', { stimulusId: stimulus._id });

      const fixations = [
        {
          timestamp: 0,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 1000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 2000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 3000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 4000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
        { timestamp: 5000, duration: 500, stimulusId: stimulus._id },
        {
          timestamp: 6000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 7000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 8000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 9000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
      ];

      expect(analysis.getVisitEndIndex({ fixations })).to.equal(4);
    });

    it('ends when the stimulus changes', () => {
      const analysis = Factory.create('analysis', {
        type: 'iso15007',
        minVisitDuration: 1000,
      });

      const stimulus1 = Factory.create('stimulus');
      const stimulus2 = Factory.create('stimulus');
      const aoi1 = Factory.create('aoi', { stimulusId: stimulus1._id });

      const fixations = [
        {
          timestamp: 0,
          duration: 500,
          stimulusId: stimulus1._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 1000,
          duration: 500,
          stimulusId: stimulus1._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 2000,
          duration: 500,
          stimulusId: stimulus1._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 3000,
          duration: 500,
          stimulusId: stimulus1._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 4000,
          duration: 500,
          stimulusId: stimulus1._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 5000,
          duration: 500,
          stimulusId: stimulus2._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 6000,
          duration: 500,
          stimulusId: stimulus1._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 7000,
          duration: 500,
          stimulusId: stimulus1._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 8000,
          duration: 500,
          stimulusId: stimulus1._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 9000,
          duration: 500,
          stimulusId: stimulus1._id,
          aoiId: aoi1._id,
        },
      ];

      expect(analysis.getVisitEndIndex({ fixations })).to.equal(4);
    });

    it('ends when a fixation does not have a stimulus', () => {
      const analysis = Factory.create('analysis', {
        type: 'iso15007',
        minVisitDuration: 1000,
      });

      const stimulus = Factory.create('stimulus');
      const aoi1 = Factory.create('aoi', { stimulusId: stimulus._id });

      const fixations = [
        {
          timestamp: 0,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 1000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 2000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 3000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 4000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
        { timestamp: 5000, duration: 500, aoiId: aoi1._id },
        {
          timestamp: 6000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 7000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 8000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
        {
          timestamp: 9000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi1._id,
        },
      ];

      expect(analysis.getVisitEndIndex({ fixations })).to.equal(4);
    });
  });

  describe('type !== iso15007', () => {
    it('gets the endIndex', async () => {
      const analysis = Factory.create('analysis', {
        minVisitDuration: 5000,
        maxVisitGapDuration: 5000,
      });

      const stimulus = Factory.create('stimulus');
      const aoi = Factory.create('aoi', { stimulusId: stimulus._id });

      const fixations = [
        {
          timestamp: 0,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 1000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 2000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 3000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 4000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 5000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 6000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 7000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 8000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 9000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
      ];
      expect(analysis.getVisitEndIndex({ fixations })).to.equal(9);
    });
    it('exceeds the maxVisitGapDuration and meets the minVisitDuration', async () => {
      const analysis = Factory.create('analysis', {
        type: 'custom',
        minVisitDuration: 3000,
        maxVisitGapDuration: 5000,
      });

      const stimulus = Factory.create('stimulus');
      const aoi = Factory.create('aoi', { stimulusId: stimulus._id });

      const fixations = [
        {
          timestamp: 0,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 1000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 2000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 3000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 4000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 15000, // 10500 ms gap!
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 16000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
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
      const aoi = Factory.create('aoi', { stimulusId: stimulus._id });

      const fixations = [
        {
          timestamp: 0,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 1000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 2000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 3000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 4000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 15000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        }, // exceeds MVGD
        {
          timestamp: 16000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
      ];

      expect(() => {
        analysis.getVisitEndIndex({ fixations });
      }).to.throw('minVisitDurationNotMet');
    });

    it('ends on the last fixation matching the initial aoi', async () => {
      const analysis = Factory.create('analysis', {
        type: 'custom',
        minVisitDuration: 3000,
        maxVisitGapDuration: 5000,
      });

      const stimulus = Factory.create('stimulus');
      const aoi = Factory.create('aoi', { stimulusId: stimulus._id });
      const aoi2 = Factory.create('aoi', { stimulusId: stimulus._id });

      const fixations = [
        {
          timestamp: 0,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 1000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 2000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 3000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 4000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        // aoi changed and never went back
        {
          timestamp: 5000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi2._id,
        },
        {
          timestamp: 6000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi2._id,
        },
        {
          timestamp: 7000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi2._id,
        },
      ];
      expect(analysis.getVisitEndIndex({ fixations })).to.equal(4);
    });

    it('can have a gap with fixations from another aoi', async () => {
      const analysis = Factory.create('analysis', {
        type: 'custom',
        minVisitDuration: 3000,
        maxVisitGapDuration: 5000,
      });

      const stimulus = Factory.create('stimulus');
      const aoi = Factory.create('aoi', { stimulusId: stimulus._id });
      const aoi2 = Factory.create('aoi', { stimulusId: stimulus._id });

      const fixations = [
        {
          timestamp: 0,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 1000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 2000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 3000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 4000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 5000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi2._id,
        }, // 3500 ms gap
        {
          timestamp: 6000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi2._id,
        }, // 3500 ms gap
        {
          timestamp: 7000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi2._id,
        }, // 3500 ms gap
        {
          timestamp: 8000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 9000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
      ];
      expect(analysis.getVisitEndIndex({ fixations })).to.equal(9);
    });

    it('looks at another aoi too long', async () => {
      const analysis = Factory.create('analysis', {
        type: 'custom',
        minVisitDuration: 3000,
        maxVisitGapDuration: 3000,
      });

      const stimulus = Factory.create('stimulus');
      const aoi = Factory.create('aoi', { stimulusId: stimulus._id });
      const aoi2 = Factory.create('aoi', { stimulusId: stimulus._id });

      const fixations = [
        {
          timestamp: 0,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 1000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 2000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 3000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 4000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 5000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi2._id,
        }, // 3500 ms gap
        {
          timestamp: 6000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi2._id,
        }, // 3500 ms gap
        {
          timestamp: 7000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi2._id,
        }, // 3500 ms gap
        {
          timestamp: 8000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
        {
          timestamp: 9000,
          duration: 500,
          stimulusId: stimulus._id,
          aoiId: aoi._id,
        },
      ];
      expect(analysis.getVisitEndIndex({ fixations })).to.equal(4);
    });
  });
});
