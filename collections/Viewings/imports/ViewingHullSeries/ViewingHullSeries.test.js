import ViewingHullSeries from './ViewingHullSeries';

require('../../../factories.test');
const { expect } = require('chai');

describe('ViewingHullSeries', () => {
  it('has no points', () => {
    expect(() => {
      new ViewingHullSeries();
    }).to.throw('noPoints');
  });

  it('has no viewing', () => {
    const points = [
      { x: 100, y: 400, timestamp: 0 },
      { x: 200, y: 300, timestamp: 1000 },
      { x: 300, y: 200, timestamp: 2000 },
      { x: 400, y: 100, timestamp: 3000 },
    ];

    expect(() => {
      new ViewingHullSeries({ points, period: 5000 });
    }).to.throw('noViewing');
  });

  it('has a viewing with no points', () => {
    const viewing = Factory.create('viewing');
    expect(() => {
      new ViewingHullSeries({ viewing });
    }).to.throw('noPoints');
  });

  it('has a viewing with points', () => {
    const points = [
      { x: 100, y: 400, timestamp: 0 },
      { x: 200, y: 300, timestamp: 1000 },
      { x: 300, y: 200, timestamp: 2000 },
      { x: 400, y: 100, timestamp: 3000 },
    ];

    const viewing = Factory.create('viewing', { gazepoints: points });
    const hullseries = new ViewingHullSeries({ viewing, period: 5000 });

    expect(hullseries.points).to.eql([
      { x: 100, y: 400, timestamp: 0 },
      { x: 200, y: 300, timestamp: 1000 },
      { x: 300, y: 200, timestamp: 2000 },
      { x: 400, y: 100, timestamp: 3000 },
    ]);
  });

  it('is a ViewingHullSeries', () => {
    const viewing = Factory.create('viewingWithGazepoints');
    const hullseries = new ViewingHullSeries({ viewing, period: 5000 });

    expect(hullseries.constructor.name).to.equal('ViewingHullSeries');
  });

  it('overrides the viewing points', () => {
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

    const viewing = Factory.create('viewing', { gazepoints: points });
    const hullseries = new ViewingHullSeries({
      viewing,
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
