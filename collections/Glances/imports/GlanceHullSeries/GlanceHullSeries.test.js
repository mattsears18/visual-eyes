import GlanceHullSeries from './GlanceHullSeries';

require('../../../factories.test');
const { expect } = require('chai');

describe('GlanceHullSeries', () => {
  it('has no points', () => {
    expect(() => {
      new GlanceHullSeries();
    }).to.throw('noPoints');
  });

  it('has no glance', () => {
    const points = [
      { x: 100, y: 400, timestamp: 0 },
      { x: 200, y: 300, timestamp: 1000 },
      { x: 300, y: 200, timestamp: 2000 },
      { x: 400, y: 100, timestamp: 3000 },
    ];

    expect(() => {
      new GlanceHullSeries({ points, period: 5000 });
    }).to.throw('noGlance');
  });

  it('has a glance with no points', () => {
    const glance = Factory.create('glance');
    expect(() => {
      new GlanceHullSeries({ glance });
    }).to.throw('noPoints');
  });

  it('has a glance with points', () => {
    const points = [
      { x: 100, y: 400, timestamp: 0 },
      { x: 200, y: 300, timestamp: 1000 },
      { x: 300, y: 200, timestamp: 2000 },
      { x: 400, y: 100, timestamp: 3000 },
    ];

    const glance = Factory.create('glance', { gazepoints: points });
    const hullseries = new GlanceHullSeries({ glance, period: 5000 });

    expect(hullseries.points).to.eql([
      { x: 100, y: 400, timestamp: 0 },
      { x: 200, y: 300, timestamp: 1000 },
      { x: 300, y: 200, timestamp: 2000 },
      { x: 400, y: 100, timestamp: 3000 },
    ]);
  });

  it('is a GlanceHullSeries', () => {
    const glance = Factory.create('glanceWithGazepoints');
    const hullseries = new GlanceHullSeries({ glance, period: 5000 });

    expect(hullseries.constructor.name).to.equal('GlanceHullSeries');
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

    const glance = Factory.create('glance', { gazepoints: points });
    const hullseries = new GlanceHullSeries({
      glance,
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
