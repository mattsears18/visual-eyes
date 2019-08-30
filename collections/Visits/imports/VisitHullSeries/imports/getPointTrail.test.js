import VisitHullSeries from '../VisitHullSeries';
import defaultTestFixations from '../../../defaultTestFixations';

require('../../../../factories.test');
const { expect } = require('chai');

describe('VisitHullSeries.pointTrail()', () => {
  it('gets a point trail with default length (10)', () => {
    const hullseries = new VisitHullSeries({
      visit: Factory.create('visit', { fixations: defaultTestFixations }),
      period: 5000,
    });

    const pointTrail = hullseries.getPointTrail({ hullIndex: 7 });

    expect(pointTrail.length).to.equal(10);
    expect(pointTrail).to.eql([
      {
        x: 400,
        y: 100,
        timestamp: 3000,
        timestampEnd: 3500,
      },
      {
        x: 500,
        y: 700,
        timestamp: 4000,
        timestampEnd: 4500,
      },
      {
        x: 600,
        y: 600,
        timestamp: 5000,
        timestampEnd: 5500,
      },
      {
        x: 700,
        y: 500,
        timestamp: 6000,
        timestampEnd: 6500,
      },
      {
        x: 800,
        y: 400,
        timestamp: 7000,
        timestampEnd: 7500,
      },
      {
        x: 900,
        y: 300,
        timestamp: 8000,
        timestampEnd: 8500,
      },
      {
        x: 100,
        y: 200,
        timestamp: 9000,
        timestampEnd: 9500,
      },
      {
        x: 200,
        y: 100,
        timestamp: 10000,
        timestampEnd: 10500,
      },
      {
        x: 300,
        y: 400,
        timestamp: 11000,
        timestampEnd: 11500,
      },
      {
        x: 400,
        y: 300,
        timestamp: 12000,
        timestampEnd: 12500,
      },
    ]);
  });

  it('gets the x coordinates of a trail', () => {
    const hullseries = new VisitHullSeries({
      visit: Factory.create('visit', { fixations: defaultTestFixations }),
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
    const hullseries = new VisitHullSeries({
      visit: Factory.create('visit', { fixations: defaultTestFixations }),
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
    const hullseries = new VisitHullSeries({
      visit: Factory.create('visit', { fixations: defaultTestFixations }),
      period: 5000,
    });

    const pointTrail = hullseries.getPointTrail({
      hullIndex: 7,
      pointTrailLength: 200,
    });
    expect(pointTrail).to.eql([
      {
        x: 100,
        y: 400,
        timestamp: 0,
        timestampEnd: 500,
      },
      {
        x: 200,
        y: 300,
        timestamp: 1000,
        timestampEnd: 1500,
      },
      {
        x: 300,
        y: 200,
        timestamp: 2000,
        timestampEnd: 2500,
      },
      {
        x: 400,
        y: 100,
        timestamp: 3000,
        timestampEnd: 3500,
      },
      {
        x: 500,
        y: 700,
        timestamp: 4000,
        timestampEnd: 4500,
      },
      {
        x: 600,
        y: 600,
        timestamp: 5000,
        timestampEnd: 5500,
      },
      {
        x: 700,
        y: 500,
        timestamp: 6000,
        timestampEnd: 6500,
      },
      {
        x: 800,
        y: 400,
        timestamp: 7000,
        timestampEnd: 7500,
      },
      {
        x: 900,
        y: 300,
        timestamp: 8000,
        timestampEnd: 8500,
      },
      {
        x: 100,
        y: 200,
        timestamp: 9000,
        timestampEnd: 9500,
      },
      {
        x: 200,
        y: 100,
        timestamp: 10000,
        timestampEnd: 10500,
      },
      {
        x: 300,
        y: 400,
        timestamp: 11000,
        timestampEnd: 11500,
      },
      {
        x: 400,
        y: 300,
        timestamp: 12000,
        timestampEnd: 12500,
      },
    ]);
  });

  it('has an invalid point trail length', () => {
    const hullseries = new VisitHullSeries({
      visit: Factory.create('visit', { fixations: defaultTestFixations }),
      period: 5000,
    });

    expect(() => {
      hullseries.getPointTrail({ hullIndex: 7, pointTrailLength: -1 });
    }).to.throw('invalidPointTrailLength');
  });

  it('requests a zero length point trail', () => {
    const hullseries = new VisitHullSeries({
      visit: Factory.create('visit', { fixations: defaultTestFixations }),
      period: 5000,
    });

    const pointTrail = hullseries.getPointTrail({
      hullIndex: 7,
      pointTrailLength: 0,
    });
    expect(pointTrail).to.eql([]);
  });
});
