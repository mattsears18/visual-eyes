import ViewingHullSeries from '../ViewingHullSeries';

require('../../../../factories.test');
const { expect } = require('chai');

describe('ViewingHullSeries.getPointsTimeText()', () => {
  it('gets the hull points time as text', () => {
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

    const hullseries = new ViewingHullSeries({
      viewing: Factory.create('viewing', { gazepoints: points }),
      period: 5000,
    });

    expect(hullseries.getPointsTimeText({ hullIndex: 3 })).to.eql([
      'Time: 3000ms',
      'Time: 4000ms',
      'Time: 5000ms',
      'Time: 6000ms',
      'Time: 7000ms',
      'Time: 8000ms',
    ]);
  });
});
