require('../../../../factories.test');
import PlotHull from '../PlotHull';

describe('PlotHull.polygon()', () => {
  it('gets a polygon with no inner points', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 200, y: 100, timestamp: 1000 },
        { x: 200, y: 200, timestamp: 2000 },
        { x: 100, y: 200, timestamp: 3000 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.polygon({})).to.eql([
      { x: 200, y: 200 },
      { x: 100, y: 200 },
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 200, y: 200 },
    ]);
  });

  it('gets a polygon with inner points', () => {
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
    chai.expect(plotHull.polygon({})).to.eql([
      { x: 200, y: 200 },
      { x: 100, y: 200 },
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 200, y: 200 },
    ]);
  });

  it('gets the x coordinates of a polygon with inner points', () => {
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
    chai.expect(plotHull.polygon({ which: 'x' })).to.eql([ 200, 100, 100, 200, 200 ]);
  });

  it('gets the y coordinates of a polygon with inner points', () => {
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
    chai.expect(plotHull.polygon({ which: 'y' })).to.eql([ 200, 200, 100, 100, 200 ]);
  });

  it('only has one point', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.polygon({})).to.eql([
      { x: 100, y: 100 },
      { x: 100, y: 100 },
    ]);
  });

  it('only has two points', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 200, y: 100, timestamp: 1000 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.polygon({})).to.eql([
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 100, y: 100 },
    ]);
  });

  it('only has three points', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 200, y: 100, timestamp: 1000 },
        { x: 100, y: 200, timestamp: 2000 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.polygon({})).to.eql([
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 100, y: 200 },
      { x: 100, y: 100 },
    ]);
  });
});
