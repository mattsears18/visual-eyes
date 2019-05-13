import ViewingHullSeries from '../ViewingHullSeries';

require('../../../../factories.test');
const { expect } = require('chai');

describe('ViewingHullSeries.getPolygonTrace()', () => {
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

  it('gets the initial polygon trace', () => {
    const hullseries = new ViewingHullSeries({
      viewing: Factory.create('viewing', {
        studyId: Factory.create('study', { fixationsOnly: false })._id,
        gazepoints: points,
      }),
      period: 5000,
    });

    const trace = hullseries.getPolygonTrace({ initial: true, hullIndex: 0 });

    expect(trace.name).to.equal('Convex Hull');
    expect(trace.x).to.eql([600, 500, 100, 400, 600]);
    expect(trace.y).to.eql([600, 700, 400, 100, 600]);
  });

  it('gets a polygon trace (not initial)', () => {
    const hullseries = new ViewingHullSeries({
      viewing: Factory.create('viewing', {
        studyId: Factory.create('study', { fixationsOnly: false })._id,
        gazepoints: points,
      }),
      period: 5000,
    });

    const trace = hullseries.getPolygonTrace({ initial: false, hullIndex: 9 });

    expect(trace.name).to.be.an('undefined');
    expect(trace.x).to.eql([600, 300, 100, 200, 600]);
    expect(trace.y).to.eql([100, 400, 200, 100, 100]);
  });
});
