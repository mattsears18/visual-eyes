require('../../../factories.test');

describe('PlotHullSeries.getHulls()', () => {
  it('gets instantaneous slide hulls', () => {
    let viewing = Factory.create('viewing', {
      period: 5000,
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },         // 0
        { x: 100, y: 100, timestamp: 1000 },      // 01
        { x: 100, y: 100, timestamp: 2000 },      // 012
        { x: 100, y: 100, timestamp: 3000 },      // 0123
        { x: 100, y: 100, timestamp: 4000 },      // 01234
        { x: 100, y: 100, timestamp: 5000 },      // 012345
        { x: 100, y: 100, timestamp: 6000 },      // 123456
        { x: 100, y: 100, timestamp: 7000 },      // 234567
        { x: 100, y: 100, timestamp: 8000 },      // 345678
        { x: 100, y: 100, timestamp: 9000 },      // 456789
        { x: 100, y: 100, timestamp: 10000 },     // 56789
        { x: 100, y: 100, timestamp: 11000 },     // 6789
        { x: 100, y: 100, timestamp: 12000 },     // 789
        { x: 100, y: 100, timestamp: 13000 },     // 89
        { x: 100, y: 100, timestamp: 14000 },     // 9
      ],
    });

    let hullSeries = viewing.plotHullSeries({
      instantContinuous: 'instantaneous',
      slideStep: 'slide',
    });

    let hulls = hullSeries.getHulls();

    chai.expect(hulls.length).to.equal(10);
    chai.expect(hulls[0].startIndex).to.equal(0);
    chai.expect(hulls[1].startIndex).to.equal(1);
    chai.expect(hulls[2].startIndex).to.equal(2);
    chai.expect(hulls[3].startIndex).to.equal(3);
    chai.expect(hulls[4].startIndex).to.equal(4);
    chai.expect(hulls[5].startIndex).to.equal(5);
    chai.expect(hulls[6].startIndex).to.equal(6);
    chai.expect(hulls[7].startIndex).to.equal(7);
    chai.expect(hulls[8].startIndex).to.equal(8);
    chai.expect(hulls[9].startIndex).to.equal(9);

    chai.expect(hulls[0].endIndex).to.equal(5);
    chai.expect(hulls[1].endIndex).to.equal(6);
    chai.expect(hulls[2].endIndex).to.equal(7);
    chai.expect(hulls[3].endIndex).to.equal(8);
    chai.expect(hulls[4].endIndex).to.equal(9);
    chai.expect(hulls[5].endIndex).to.equal(10);
    chai.expect(hulls[6].endIndex).to.equal(11);
    chai.expect(hulls[7].endIndex).to.equal(12);
    chai.expect(hulls[8].endIndex).to.equal(13);
    chai.expect(hulls[9].endIndex).to.equal(14);
  });

  it('gets continuous slide hulls', () => {
    let viewing = Factory.create('viewing', {
      period: 5000,
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },         // 0123456789
        { x: 100, y: 100, timestamp: 1000 },      // 0123456789
        { x: 100, y: 100, timestamp: 2000 },      // 0123456789
        { x: 100, y: 100, timestamp: 3000 },      // 0123456789
        { x: 100, y: 100, timestamp: 4000 },      // 0123456789
        { x: 100, y: 100, timestamp: 5000 },      // 0123456789
        { x: 100, y: 100, timestamp: 6000 },      // 123456789
        { x: 100, y: 100, timestamp: 7000 },      // 23456789
        { x: 100, y: 100, timestamp: 8000 },      // 3456789
        { x: 100, y: 100, timestamp: 9000 },      // 456789
        { x: 100, y: 100, timestamp: 10000 },     // 56789
        { x: 100, y: 100, timestamp: 11000 },     // 6789
        { x: 100, y: 100, timestamp: 12000 },     // 789
        { x: 100, y: 100, timestamp: 13000 },     // 89
        { x: 100, y: 100, timestamp: 14000 },     // 9
      ],
    });

    let hullSeries = viewing.plotHullSeries({
      instantContinuous: 'continuous',
      slideStep: 'slide',
    });

    let hulls = hullSeries.getHulls();

    chai.expect(hulls.length).to.equal(10);
    chai.expect(hulls[0].startIndex).to.equal(0);
    chai.expect(hulls[1].startIndex).to.equal(0);
    chai.expect(hulls[2].startIndex).to.equal(0);
    chai.expect(hulls[3].startIndex).to.equal(0);
    chai.expect(hulls[4].startIndex).to.equal(0);
    chai.expect(hulls[5].startIndex).to.equal(0);
    chai.expect(hulls[6].startIndex).to.equal(0);
    chai.expect(hulls[7].startIndex).to.equal(0);
    chai.expect(hulls[8].startIndex).to.equal(0);
    chai.expect(hulls[9].startIndex).to.equal(0);

    chai.expect(hulls[0].endIndex).to.equal(5);
    chai.expect(hulls[1].endIndex).to.equal(6);
    chai.expect(hulls[2].endIndex).to.equal(7);
    chai.expect(hulls[3].endIndex).to.equal(8);
    chai.expect(hulls[4].endIndex).to.equal(9);
    chai.expect(hulls[5].endIndex).to.equal(10);
    chai.expect(hulls[6].endIndex).to.equal(11);
    chai.expect(hulls[7].endIndex).to.equal(12);
    chai.expect(hulls[8].endIndex).to.equal(13);
    chai.expect(hulls[9].endIndex).to.equal(14);
  });
});
