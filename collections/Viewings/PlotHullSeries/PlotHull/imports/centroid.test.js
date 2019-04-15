require('../../../../factories.test');
import PlotHull from '../PlotHull';

describe.only('PlotHull.centroid()', () => {
  it('gets a centroid with no inner points', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 200, y: 100, timestamp: 1000 },
        { x: 200, y: 200, timestamp: 2000 },
        { x: 100, y: 200, timestamp: 3000 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.centroid({})).to.eql({ x: 150, y: 150 });
  });

  it('gets a centroid with inner points', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 200, y: 100, timestamp: 1000 },
        { x: 200, y: 200, timestamp: 2000 },
        { x: 100, y: 200, timestamp: 3000 },
        { x: 150, y: 120, timestamp: 3000 },
        { x: 110, y: 190, timestamp: 3000 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.centroid({})).to.eql({ x: 150, y: 150 });
  });

  it('only has one point', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 1337, y: 137, timestamp: 0 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.centroid({})).to.eql({ x: 1337, y: 137 });
  });

  it('only has one unique point', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 1337, y: 137, timestamp: 0 },
        { x: 1337, y: 137, timestamp: 0 },
        { x: 1337, y: 137, timestamp: 0 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.centroid({})).to.eql({ x: 1337, y: 137 });
  });

  it('only has two points', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 200, y: 100, timestamp: 1000 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.centroid({})).to.eql({ x: 150, y: 100 });
  });

  it('only has three points', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 0, y: 0, timestamp: 0 },
        { x: 100, y: 0, timestamp: 1000 },
        { x: 50, y: 300, timestamp: 2000 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.centroid({})).to.eql({ x: 50, y: 100 });
  });
});
