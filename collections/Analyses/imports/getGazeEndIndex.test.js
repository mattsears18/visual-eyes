import '../../factories.test';
import { expect } from 'chai';

describe('Analyses.getGazeEndIndex()', () => {
  it('gets the endIndex', async () => {
    const analysis = Factory.create('analysis', {
      minGazeTime: 5000,
      gazeGap: 5000,
    });

    const points = [
      { timestamp: 0 },
      { timestamp: 1000 },
      { timestamp: 2000 },
      { timestamp: 3000 },
      { timestamp: 4000 },
      { timestamp: 5000 },
      { timestamp: 6000 },
      { timestamp: 7000 },
      { timestamp: 8000 },
      { timestamp: 9000 },
    ];

    expect(analysis.getGazeEndIndex({ gazepoints: points })).to.equal(9);
  });

  it('exceeds the gazeGap', async () => {
    const analysis = Factory.create('analysis', {
      minGazeTime: 3000,
      gazeGap: 5000,
    });

    const points = [
      { timestamp: 0 },
      { timestamp: 1000 },
      { timestamp: 2000 },
      { timestamp: 3000 },
      { timestamp: 4000 },
      { timestamp: 15000 },
      { timestamp: 16000 },
      { timestamp: 17000 },
      { timestamp: 18000 },
      { timestamp: 19000 },
    ];

    expect(analysis.getGazeEndIndex({ gazepoints: points })).to.equal(4);
  });

  it('does not meet the minGazeTime and has more points', async () => {
    const analysis = Factory.create('analysis', {
      minGazeTime: 10000,
      gazeGap: 5000,
    });

    const points = [
      { timestamp: 0 },
      { timestamp: 1000 },
      { timestamp: 2000 },
      { timestamp: 3000 },
      { timestamp: 4000 },
      { timestamp: 15000 },
      { timestamp: 16000 },
      { timestamp: 17000 },
      { timestamp: 18000 },
      { timestamp: 19000 },
    ];

    expect(() => {
      analysis.getGazeEndIndex({ gazepoints: points });
    }).to.throw('minGazeTimeNotMet');

    try {
      analysis.getGazeEndIndex({ gazepoints: points });
    } catch (err) {
      expect(err.details.nextIndex).to.equal(5);
    }
  });

  it('has has a startIndex that is too high', async () => {
    const analysis = Factory.create('analysis', {
      minGazeTime: 10000,
      gazeGap: 5000,
    });

    const points = [
      { timestamp: 0 },
      { timestamp: 1000 },
      { timestamp: 2000 },
      { timestamp: 3000 },
      { timestamp: 4000 },
    ];

    expect(() => {
      analysis.getGazeEndIndex({ gazepoints: points, startIndex: 4 });
    }).to.throw('startIndexTooHigh');
  });
});
