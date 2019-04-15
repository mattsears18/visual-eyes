require('../../../../factories.test');
import PlotHull from '../PlotHull';

describe('PlotHull.timestep()', () => {
  it('has too few points to calculate a timestep', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.timestep()).to.equal(0);
  });


  it('gets a timestep', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 100, y: 100, timestamp: 1000 },
        { x: 100, y: 100, timestamp: 2000 },
        { x: 100, y: 100, timestamp: 3000 },
        { x: 100, y: 100, timestamp: 3500 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.timestep()).to.equal(500);
  });
});
