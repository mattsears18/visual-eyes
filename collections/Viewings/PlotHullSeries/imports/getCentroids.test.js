require('../../../factories.test');

if(Meteor.isServer) {
  describe('PlotHull.getCentroids()', () => {
    it('gets the centroids', () => {
      let viewing = Factory.create('viewing', {
        period: 5000,
        gazepoints: [
          { x: 100, y: 400, timestamp: 0 },
          { x: 200, y: 300, timestamp: 1000 },
          { x: 300, y: 200, timestamp: 2000 },
          { x: 400, y: 100, timestamp: 3000 },
          { x: 500, y: 700, timestamp: 4000 },
          { x: 600, y: 600, timestamp: 5000 },
          { x: 700, y: 500, timestamp: 6000 },
          { x: 800, y: 400, timestamp: 7000 },
          { x: 900, y: 300, timestamp: 8000 },
          { x: 100, y: 200, timestamp: 9000 },
          { x: 200, y: 100, timestamp: 10000 },
          { x: 300, y: 400, timestamp: 11000 },
          { x: 400, y: 300, timestamp: 12000 },
          { x: 500, y: 200, timestamp: 13000 },
          { x: 600, y: 100, timestamp: 14000 },
        ],
      });

      let centroids = viewing.plotHullSeries({
        instantContinuous: 'instantaneous',
        slideStep: 'slide',
        fixationTrailLength: 10,
      }).getCentroids({});

      chai.expect(centroids.length).to.equal(10);
      chai.expect(centroids).to.eql([
        { x: 375, y: 416.6666666666667 },
        { x: 450, y: 400 },
        { x: 525, y: 383.3333333333333 },
        { x: 600, y: 366.6666666666667 },
        { x: 500, y: 400 },
        { x: 500, y: 325 },
        { x: 484.8484848484849, y: 303.030303030303 },
        { x: 464.2857142857143, y: 279.76190476190476 },
        { x: 420.28985507246375, y: 260.8695652173913 },
        { x: 325, y: 208.33333333333334 }
      ]);
    });

    it('gets the first 5 centroids', () => {
      let viewing = Factory.create('viewing', {
        period: 5000,
        gazepoints: [
          { x: 100, y: 400, timestamp: 0 },
          { x: 200, y: 300, timestamp: 1000 },
          { x: 300, y: 200, timestamp: 2000 },
          { x: 400, y: 100, timestamp: 3000 },
          { x: 500, y: 700, timestamp: 4000 },
          { x: 600, y: 600, timestamp: 5000 },
          { x: 700, y: 500, timestamp: 6000 },
          { x: 800, y: 400, timestamp: 7000 },
          { x: 900, y: 300, timestamp: 8000 },
          { x: 100, y: 200, timestamp: 9000 },
          { x: 200, y: 100, timestamp: 10000 },
          { x: 300, y: 400, timestamp: 11000 },
          { x: 400, y: 300, timestamp: 12000 },
          { x: 500, y: 200, timestamp: 13000 },
          { x: 600, y: 100, timestamp: 14000 },
        ],
      });

      let centroids = viewing.plotHullSeries({
        instantContinuous: 'instantaneous',
        slideStep: 'slide',
        fixationTrailLength: 10,
      }).getCentroids({ endIndex: 4 });

      chai.expect(centroids.length).to.equal(5);
      chai.expect(centroids).to.eql([
        { x: 375, y: 416.6666666666667 },
        { x: 450, y: 400 },
        { x: 525, y: 383.3333333333333 },
        { x: 600, y: 366.6666666666667 },
        { x: 500, y: 400 },
      ]);
    });

    it('gets one coordinate of the centroids', () => {
      let viewing = Factory.create('viewing', {
        period: 5000,
        gazepoints: [
          { x: 100, y: 400, timestamp: 0 },
          { x: 200, y: 300, timestamp: 1000 },
          { x: 300, y: 200, timestamp: 2000 },
          { x: 400, y: 100, timestamp: 3000 },
          { x: 500, y: 700, timestamp: 4000 },
          { x: 600, y: 600, timestamp: 5000 },
          { x: 700, y: 500, timestamp: 6000 },
          { x: 800, y: 400, timestamp: 7000 },
          { x: 900, y: 300, timestamp: 8000 },
          { x: 100, y: 200, timestamp: 9000 },
          { x: 200, y: 100, timestamp: 10000 },
          { x: 300, y: 400, timestamp: 11000 },
          { x: 400, y: 300, timestamp: 12000 },
          { x: 500, y: 200, timestamp: 13000 },
          { x: 600, y: 100, timestamp: 14000 },
        ],
      });

      let series = viewing.plotHullSeries({
        instantContinuous: 'instantaneous',
        slideStep: 'slide',
        fixationTrailLength: 10,
      });

      let centroidXs = series.getCentroids({ which: 'x' });
      chai.expect(centroidXs.length).to.equal(10);
      chai.expect(centroidXs).to.eql([
        375,
        450,
        525,
        600,
        500,
        500,
        484.8484848484849,
        464.2857142857143,
        420.28985507246375,
        325,
      ]);

      let centroidYs = series.getCentroids({ which: 'y' });
      chai.expect(centroidYs.length).to.equal(10);
      chai.expect(centroidYs).to.eql([
        416.6666666666667,
        400,
        383.3333333333333,
        366.6666666666667,
        400,
        325,
        303.030303030303,
        279.76190476190476,
        260.8695652173913,
        208.33333333333334,
      ]);
    });
  });
}
