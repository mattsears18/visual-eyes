require('../../../../factories.test');
import PlotHull from '../PlotHull';

describe('PlotHull.velocity()', () => {
  it('calculates the total velocity (speed)', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 200, y: 100, timestamp: 1000 },
        { x: 200, y: 200, timestamp: 2900 },
        { x: -100, y: -200, timestamp: 3000 }, //distance 300 left, 400 down, 500 total (hypotenuse)
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.velocity()).to.equal(5);
  });

  it('calculates the x component of velocity', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 200, y: 100, timestamp: 1000 },
        { x: 200, y: 200, timestamp: 2900 },
        { x: -100, y: -200, timestamp: 3000 }, //distance 300 left, 400 down, 500 total (hypotenuse)
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.velocity('x')).to.equal(-3);
  });

  it('calculates the y component of velocity', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 200, y: 100, timestamp: 1000 },
        { x: 200, y: 200, timestamp: 2900 },
        { x: -100, y: -200, timestamp: 3000 }, //distance 300 left, 400 down, 500 total (hypotenuse)
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.velocity('y')).to.equal(-4);
  });

  it('does not move', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 200, y: 100, timestamp: 1000 },
        { x: 200, y: 200, timestamp: 2900 },
        { x: 200, y: 200, timestamp: 3000 }, //distance 300 left, 400 down, 500 total (hypotenuse)
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.velocity()).to.equal(0);
    chai.expect(plotHull.velocity('x')).to.equal(0);
    chai.expect(plotHull.velocity('y')).to.equal(0);
  });
});
