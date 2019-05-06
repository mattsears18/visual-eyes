require('./../../factories.test');
const expect = require('chai').expect;

describe('Analyses.getViewingEndIndex()', () => {
  it('gets the endIndex', async () => {
    let analysis = Factory.create('analysis', {
      minViewingTime: 5000,
      viewingGap: 5000,
    });

    let points = [
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

    expect(analysis.getViewingEndIndex({ gazepoints: points })).to.equal(9);
  });

  it('exceeds the viewingGap', async () => {
    let analysis = Factory.create('analysis', {
      minViewingTime: 3000,
      viewingGap: 5000,
    });

    let points = [
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

    expect(analysis.getViewingEndIndex({ gazepoints: points })).to.equal(4);
  });

  it('does not meet the minViewingTime and has more points', async () => {
    let analysis = Factory.create('analysis', {
      minViewingTime: 10000,
      viewingGap: 5000,
    });

    let points = [
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

    expect(() => { analysis.getViewingEndIndex({ gazepoints: points })}).to.throw('minViewingTimeNotMet');

    try {
      analysis.getViewingEndIndex({ gazepoints: points });
    } catch(err) {
      expect(err.details.nextIndex).to.equal(5);
    }
  });

  it('has has a startIndex that is too high', async () => {
    let analysis = Factory.create('analysis', {
      minViewingTime: 10000,
      viewingGap: 5000,
    });

    let points = [
      { timestamp: 0 },
      { timestamp: 1000 },
      { timestamp: 2000 },
      { timestamp: 3000 },
      { timestamp: 4000 },
    ];

    expect(() => { analysis.getViewingEndIndex({ gazepoints: points, startIndex: 4 })}).to.throw('startIndexTooHigh');
  });
});
