require('../../../../factories.test');
import PlotHull from '../PlotHull';

describe('PlotHull.area()', () => {
  it('gets an area with no inner points', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 200, y: 100, timestamp: 1000 },
        { x: 200, y: 200, timestamp: 2000 },
        { x: 100, y: 200, timestamp: 3000 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.area({})).to.equal(10000);
  });

  it('gets an area with inner points', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 200, y: 100, timestamp: 1000 },
        { x: 200, y: 200, timestamp: 2000 },
        { x: 100, y: 200, timestamp: 3000 },
        { x: 150, y: 120, timestamp: 4000 },
        { x: 110, y: 190, timestamp: 5000 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.area({})).to.equal(10000);
  });

  it('only has one point', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 1337, y: 137, timestamp: 0 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.area({})).to.equal(0);
  });

  it('only has two points', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 200, y: 100, timestamp: 1000 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.area({})).to.equal(0);
  });

  it('has three points but less than three unique', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 200, y: 100, timestamp: 1000 },
        { x: 100, y: 100, timestamp: 2000 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.area({})).to.equal(0);
  });

  it('has three unique points', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 200, y: 100, timestamp: 1000 },
        { x: 100, y: 200, timestamp: 2000 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.area({})).to.equal(5000);
  });

  it('has three unique but colinear points', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 200, y: 200, timestamp: 1000 },
        { x: 300, y: 300, timestamp: 2000 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.area({})).to.equal(0);
  });

  it('gets the area of a custom set of points', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 1, y: 1, timestamp: 1000 },
      ]
    });
    let plotHull = new PlotHull({ viewing: viewing });

    let points = [
      { x: 0,   y: 0 },
      { x: 300, y: 0 },
      { x: 300, y: 100 },
      { x: 0,   y: 100 },
    ]

    chai.expect(plotHull.area({ points: points })).to.equal(30000);
  });
});
