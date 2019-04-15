require('../../../../factories.test');
import PlotHull from '../PlotHull';

describe.only('PlotHull.coverage()', () => {
  it('has too few gazepoints', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 200, y: 200, timestamp: 1000 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.coverage({})).to.equal(0);
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
    chai.expect(plotHull.coverage({})).to.equal(0);
  });

  it('gets coverage with no inner points', () => {
    let stimulus = Factory.create('stimulus', { width: 2000, height: 1000 });
    let viewing = Factory.create('viewing', {
      stimulusId: stimulus._id,
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 200, y: 100, timestamp: 1000 },
        { x: 200, y: 200, timestamp: 2000 },
        { x: 100, y: 200, timestamp: 3000 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.coverage({})).to.equal(0.005);
  });

  it('has full coverage', () => {
    let stimulus = Factory.create('stimulus', { width: 2000, height: 1000 });
    let viewing = Factory.create('viewing', {
      stimulusId: stimulus._id,
      gazepoints: [
        { x: 0,     y: 0,     timestamp: 0 },
        { x: 2000,  y: 0,     timestamp: 1000 },
        { x: 2000,  y: 1000,  timestamp: 2000 },
        { x: 0,     y: 1000,  timestamp: 3000 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.coverage({})).to.equal(1);
  });

  it('gets the coverage of a custom set of points', () => {
    let stimulus = Factory.create('stimulus', { width: 1000, height: 1000 });
    let viewing = Factory.create('viewing', {
      stimulusId: stimulus._id,
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

    chai.expect(plotHull.coverage({ points: points })).to.equal(0.03);
  });
});
