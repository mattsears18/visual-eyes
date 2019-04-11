require('../../../factories.test');
import PlotHull from './PlotHull';

describe('PlotHull.constructor()', () => {
  it('has no viewing', () => {
    chai.expect(() => { new PlotHull({}) }).to.throw('noViewing');
  });

  it('has a viewing with no gazepoints', () => {
    let viewing = Factory.create('viewing');
    chai.expect(() => { new PlotHull({ viewing: viewing }) }).to.throw('noGazepoints');
  });

  it('has a default startIndex of zero', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 100, y: 100, timestamp: 1000 },
        { x: 100, y: 100, timestamp: 2000 },
        { x: 100, y: 100, timestamp: 3000 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.startIndex).to.equal(0);
  });

  it('has a default endIndex of 3', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 100, y: 100, timestamp: 1000 },
        { x: 100, y: 100, timestamp: 2000 },
        { x: 100, y: 100, timestamp: 3000 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.endIndex).to.equal(3);
  });

  it('calculates a duration', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
        { x: 100, y: 100, timestamp: 1000 },
        { x: 100, y: 100, timestamp: 2000 },
        { x: 100, y: 100, timestamp: 3000 },
        { x: 100, y: 100, timestamp: 7000 },
        { x: 100, y: 100, timestamp: 8000 },
        { x: 100, y: 100, timestamp: 10000 },
        { x: 100, y: 100, timestamp: 10000 },
        { x: 100, y: 100, timestamp: 10000 },
      ],
    });

    chai.expect(new PlotHull({ viewing: viewing, startIndex: 0, endIndex: 1 }).duration()).to.equal(1000);
    chai.expect(new PlotHull({ viewing: viewing, startIndex: 0, endIndex: 3 }).duration()).to.equal(4000);
    chai.expect(new PlotHull({ viewing: viewing, startIndex: 0, endIndex: 6 }).duration()).to.equal(0);
  });
});


describe('PlotHull - simple methods', () => {
  it('has a startTime', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 1337 },
        { x: 100, y: 100, timestamp: 2000 },
        { x: 100, y: 100, timestamp: 3000 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.startTime()).to.equal(1337);
  });

  it('has an endTime', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 1337 },
        { x: 100, y: 100, timestamp: 2000 },
        { x: 100, y: 100, timestamp: 3000 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.endTime()).to.equal(3000);
  });

  it('has a period', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 1337 },
        { x: 100, y: 100, timestamp: 2000 },
        { x: 100, y: 100, timestamp: 3000 },
        { x: 100, y: 100, timestamp: 4000 },
        { x: 100, y: 100, timestamp: 5000 },
      ],
    });

    let plotHull = new PlotHull({ viewing: viewing });
    chai.expect(plotHull.period()).to.equal(3663);
  });
});
