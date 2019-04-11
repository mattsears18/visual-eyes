require('../../../../factories.test');
import PlotHull from '../PlotHull';

describe('PlotHull.coverage()', () => {
  it('has too few gazepoints', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 200, y: 200, timestamp: 1000 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.coverage()).to.equal(0);
  });

  it('zero coverage', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 100, y: 100, timestamp: 1000 },
        { x: 100, y: 100, timestamp: 2000 },
        { x: 100, y: 100, timestamp: 3000 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.coverage()).to.equal(0);
  });
});
