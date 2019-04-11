require('../../../factories.test');

describe('PlotHullSeries.getStartGazepointIndex()', () => {
  it('gets the start indices', async () => {
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

    chai.expect(hullSeries.getStartGazepointIndex(9)).to.equal(4);
    chai.expect(hullSeries.getStartGazepointIndex(8)).to.equal(4);
  });

  it('returns the first gazepoint when it runs out of gazepoints', () => {
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

    chai.expect(hullSeries.getStartGazepointIndex(2)).to.equal(0);
    chai.expect(hullSeries.getStartGazepointIndex(0)).to.equal(0);
  });


  it('has an endIndex that is out of bounds', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
      ],
    });

    let hullSeries = viewing.plotHullSeries({
      instantContinuous: 'instantaneous',
      slideStep: 'slide',
    });

    chai.expect(() => { hullSeries.getStartGazepointIndex(-1) }).to.throw('endIndexOutOfBounds');
    chai.expect(() => { hullSeries.getStartGazepointIndex(1) }).to.throw('endIndexOutOfBounds');
    chai.expect(() => { hullSeries.getStartGazepointIndex(20) }).to.throw('endIndexOutOfBounds');
  });
});
