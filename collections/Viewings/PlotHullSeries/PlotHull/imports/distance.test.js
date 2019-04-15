require('../../../../factories.test');
import PlotHull from '../PlotHull';

describe('PlotHull.distance()', () => {
  it('calculates the total distance', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 200, y: 100, timestamp: 1000 },
        { x: 200, y: 200, timestamp: 2000 },
        { x: -100, y: -200, timestamp: 3000 }, //distance 300 left, 400 down, 500 total (hypotenuse)
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.distance()).to.equal(500);
  });

  it('calculates the x distance', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 200, y: 100, timestamp: 1000 },
        { x: 200, y: 200, timestamp: 2000 },
        { x: -100, y: -200, timestamp: 3000 }, //distance 300 left, 400 down, 500 total (hypotenuse)
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.distance('x')).to.equal(-300);
  });

  it('calculates the y distance', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 200, y: 100, timestamp: 1000 },
        { x: 200, y: 200, timestamp: 2000 },
        { x: -100, y: -200, timestamp: 3000 }, //distance 300 left, 400 down, 500 total (hypotenuse)
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.distance('y')).to.equal(-400);
  });
});
