import VisitHullSeries from '../VisitHullSeries';

require('../../../../factories.test');
const { expect } = require('chai');

describe('VisitHullSeries.getCentroidTrailTrace()', () => {
  const points = [
    { x: 100, y: 400, timestamp: 0 },
    { x: 200, y: 300, timestamp: 1000 },
    { x: 300, y: 200, timestamp: 2000 },
    { x: 400, y: 100, timestamp: 3000 },
    { x: 500, y: 700, timestamp: 4000 },
    { x: 600, y: 600, timestamp: 5000 },
    { x: 700, y: 500, timestamp: 6000 },
    { x: 800, y: 400, timestamp: 7000 },
    { x: 900, y: 300, timestamp: 8000 },
    { x: 100, y: 200, timestamp: 9000 },
    { x: 200, y: 100, timestamp: 10000 },
    { x: 300, y: 400, timestamp: 11000 },
    { x: 400, y: 300, timestamp: 12000 },
    { x: 500, y: 200, timestamp: 13000 },
    { x: 600, y: 100, timestamp: 14000 },
  ];

  it('gets the initial centroid trail trace', () => {
    const hullseries = new VisitHullSeries({
      visit: Factory.create('visit', { gazepoints: points }),
      period: 5000,
    });

    const trace = hullseries.getCentroidTrailTrace({ initial: true });

    expect(trace.name).to.equal('Centroid Trail');
    expect(trace.x).to.eql([-10, -11]);
    expect(trace.y).to.eql([-10, -11]);
  });

  it('gets a centroid trail trace (not initial) for the first 5 hulls', () => {
    const hullseries = new VisitHullSeries({
      visit: Factory.create('visit', { gazepoints: points }),
      period: 5000,
    });

    const trace = hullseries.getCentroidTrailTrace({
      initial: false,
      hullIndex: 4,
    });

    expect(trace.name).to.be.an('undefined');
    expect(trace.x).to.eql([375, 450, 525, 600, 500]);
    expect(trace.y).to.eql([
      416.6666666666667,
      400,
      383.3333333333333,
      366.6666666666667,
      400,
    ]);
  });

  it('gets the centroid trail trace (not initial) for the first hull', () => {
    const hullseries = new VisitHullSeries({
      visit: Factory.create('visit', { gazepoints: points }),
      period: 5000,
    });

    const trace = hullseries.getCentroidTrailTrace({
      initial: false,
      hullIndex: 0,
    });

    expect(trace.name).to.be.an('undefined');
    expect(trace.x).to.eql([-10, -11]);
    expect(trace.y).to.eql([-10, -11]);
  });
});
