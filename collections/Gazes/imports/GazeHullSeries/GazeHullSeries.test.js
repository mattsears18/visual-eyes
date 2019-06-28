import GazeHullSeries from './GazeHullSeries';

require('../../../factories.test');
const { expect } = require('chai');

describe('GazeHullSeries', () => {
  it('has no points', () => {
    expect(() => {
      new GazeHullSeries();
    }).to.throw('noPoints');
  });

  it('has no gaze', () => {
    const points = [
      { x: 100, y: 400, timestamp: 0 },
      { x: 200, y: 300, timestamp: 1000 },
      { x: 300, y: 200, timestamp: 2000 },
      { x: 400, y: 100, timestamp: 3000 },
    ];

    expect(() => {
      new GazeHullSeries({ points, period: 5000 });
    }).to.throw('noGaze');
  });

  it('has a gaze with no points', () => {
    const gaze = Factory.create('gaze');
    expect(() => {
      new GazeHullSeries({ gaze });
    }).to.throw('noPoints');
  });

  it('has a gaze with points', () => {
    const points = [
      { x: 100, y: 400, timestamp: 0 },
      { x: 200, y: 300, timestamp: 1000 },
      { x: 300, y: 200, timestamp: 2000 },
      { x: 400, y: 100, timestamp: 3000 },
    ];

    const gaze = Factory.create('gaze', { gazepoints: points });
    const hullseries = new GazeHullSeries({ gaze, period: 5000 });

    expect(hullseries.points).to.eql([
      { x: 100, y: 400, timestamp: 0 },
      { x: 200, y: 300, timestamp: 1000 },
      { x: 300, y: 200, timestamp: 2000 },
      { x: 400, y: 100, timestamp: 3000 },
    ]);
  });

  it('is a GazeHullSeries', () => {
    const gaze = Factory.create('gazeWithGazepoints');
    const hullseries = new GazeHullSeries({ gaze, period: 5000 });

    expect(hullseries.constructor.name).to.equal('GazeHullSeries');
  });

  it('overrides the gaze points', () => {
    const points = [
      { x: 100, y: 400, timestamp: 0 },
      { x: 200, y: 300, timestamp: 1000 },
      { x: 300, y: 200, timestamp: 2000 },
      { x: 400, y: 100, timestamp: 3000 },
    ];

    const otherPoints = [
      { x: 700, y: 500, timestamp: 6000 },
      { x: 800, y: 400, timestamp: 7000 },
      { x: 900, y: 300, timestamp: 8000 },
      { x: 100, y: 200, timestamp: 9000 },
      { x: 200, y: 100, timestamp: 10000 },
    ];

    const gaze = Factory.create('gaze', { gazepoints: points });
    const hullseries = new GazeHullSeries({
      gaze,
      period: 5000,
      points: otherPoints,
    });

    expect(hullseries.points).to.eql([
      { x: 700, y: 500, timestamp: 6000 },
      { x: 800, y: 400, timestamp: 7000 },
      { x: 900, y: 300, timestamp: 8000 },
      { x: 100, y: 200, timestamp: 9000 },
      { x: 200, y: 100, timestamp: 10000 },
    ]);
  });
});
