require('../../../factories.test');

describe('PlotHullSeries.getEndGazepointIndex()', () => {
  it('gets the end indices', () => {
    let viewing = Factory.create('viewing', {
      period: 5000,
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 100, y: 100, timestamp: 1000 },
        { x: 100, y: 100, timestamp: 2000 },
        { x: 100, y: 100, timestamp: 3000 },
        { x: 100, y: 100, timestamp: 4000 },
        { x: 100, y: 100, timestamp: 5000 },
        { x: 100, y: 100, timestamp: 6000 },
        { x: 100, y: 100, timestamp: 7000 },
        { x: 100, y: 100, timestamp: 8001 },
        { x: 100, y: 100, timestamp: 9000 },
      ],
    });

    let hullSeries = viewing.plotHullSeries({
      instantContinuous: 'instantaneous',
      slideStep: 'slide',
    });

    chai.expect(hullSeries.getEndGazepointIndex(0)).to.equal(5);
    chai.expect(hullSeries.getEndGazepointIndex(3)).to.equal(7);
  });

  it('returns the last gazepoint when it runs out of gazepoints', () => {
    let viewing = Factory.create('viewing', {
      period: 5000,
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 100, y: 100, timestamp: 1000 },
        { x: 100, y: 100, timestamp: 2000 },
        { x: 100, y: 100, timestamp: 3000 },
        { x: 100, y: 100, timestamp: 4000 },
        { x: 100, y: 100, timestamp: 5000 },
        { x: 100, y: 100, timestamp: 6000 },
        { x: 100, y: 100, timestamp: 7000 },
        { x: 100, y: 100, timestamp: 8001 },
        { x: 100, y: 100, timestamp: 9000 },
      ],
    });

    let hullSeries = viewing.plotHullSeries({
      instantContinuous: 'instantaneous',
      slideStep: 'slide',
    });

    chai.expect(hullSeries.getEndGazepointIndex(7)).to.equal(9);
    chai.expect(hullSeries.getEndGazepointIndex(9)).to.equal(9);
  });


  it('has a startIndex that is out of bounds', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
      ],
    });

    let hullSeries = viewing.plotHullSeries({
      instantContinuous: 'instantaneous',
      slideStep: 'slide',
    });

    chai.expect(() => { hullSeries.getEndGazepointIndex(-1) }).to.throw('startIndexOutOfBounds');
    chai.expect(() => { hullSeries.getEndGazepointIndex(1) }).to.throw('startIndexOutOfBounds');
    chai.expect(() => { hullSeries.getEndGazepointIndex(20) }).to.throw('startIndexOutOfBounds');
  });
});
