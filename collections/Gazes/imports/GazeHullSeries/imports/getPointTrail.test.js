import GazeHullSeries from '../GazeHullSeries';

require('../../../../factories.test');
const { expect } = require('chai');

describe('GazeHullSeries.pointTrail()', () => {
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

  it('gets a point trail with default length (10)', () => {
    const hullseries = new GazeHullSeries({
      gaze: Factory.create('gaze', { gazepoints: points }),
      period: 5000,
    });

    const pointTrail = hullseries.getPointTrail({ hullIndex: 7 });

    expect(pointTrail.length).to.equal(10);
    expect(pointTrail).to.eql([
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
    ]);
  });

  it('gets the x coordinates of a trail', () => {
    const hullseries = new GazeHullSeries({
      gaze: Factory.create('gaze', { gazepoints: points }),
      period: 5000,
    });

    const pointTrail = hullseries.getPointTrail({ hullIndex: 7, which: 'x' });
    expect(pointTrail).to.eql([
      400,
      500,
      600,
      700,
      800,
      900,
      100,
      200,
      300,
      400,
    ]);
  });

  it('gets the y coordinates of a trail', () => {
    const hullseries = new GazeHullSeries({
      gaze: Factory.create('gaze', { gazepoints: points }),
      period: 5000,
    });

    const pointTrail = hullseries.getPointTrail({ hullIndex: 7, which: 'y' });
    expect(pointTrail).to.eql([
      100,
      700,
      600,
      500,
      400,
      300,
      200,
      100,
      400,
      300,
    ]);
  });

  it('requests a trail longer than the points', () => {
    const hullseries = new GazeHullSeries({
      gaze: Factory.create('gaze', { gazepoints: points }),
      period: 5000,
    });

    const pointTrail = hullseries.getPointTrail({
      hullIndex: 7,
      pointTrailLength: 200,
    });
    expect(pointTrail).to.eql([
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
    ]);
  });

  it('has an invalid point trail length', () => {
    const hullseries = new GazeHullSeries({
      gaze: Factory.create('gaze', { gazepoints: points }),
      period: 5000,
    });

    expect(() => {
      hullseries.getPointTrail({ hullIndex: 7, pointTrailLength: -1 });
    }).to.throw('invalidPointTrailLength');
  });

  it('requests a zero length point trail', () => {
    const hullseries = new GazeHullSeries({
      gaze: Factory.create('gaze', { gazepoints: points }),
      period: 5000,
    });

    const pointTrail = hullseries.getPointTrail({
      hullIndex: 7,
      pointTrailLength: 0,
    });
    expect(pointTrail).to.eql([]);
  });
});
