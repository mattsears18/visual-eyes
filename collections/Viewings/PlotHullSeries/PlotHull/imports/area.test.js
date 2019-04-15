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

  it('has invalid stimulus dimensions', () => {
    let stimulus = Factory.create('stimulus', { width: 0, height: 1000 });
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
    chai.expect(() => { plotHull.area({ normalized: true }) }).to.throw('invalidStimulusDimensions');
  });

  it('gets an area normalized to the stimulus dimensions', () => {
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
    chai.expect(parseFloat(plotHull.area({ normalized: true }).toFixed(3))).to.equal(0.005);
  });

  it('gets an area normalized to the stimulus dimensions (whole stimulus)', () => {
    let stimulus = Factory.create('stimulus', { width: 2000, height: 1000 });
    let viewing = Factory.create('viewing', {
      stimulusId: stimulus._id,
      gazepoints: [
        { x: 0,     y: 0, timestamp: 0 },
        { x: 2000,  y: 0, timestamp: 1000 },
        { x: 2000,  y: 1000, timestamp: 2000 },
        { x: 0,     y: 1000, timestamp: 3000 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.area({ normalized: true })).to.equal(1);
  });
});
