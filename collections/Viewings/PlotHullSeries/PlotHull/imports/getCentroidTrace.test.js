require('../../../../factories.test');

if(Meteor.isServer) {
  describe('PlotHull.getCentroidTrace()', () => {
    it('gets the initial centroid trace', () => {
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

      let hull = viewing.plotHullSeries({
        instantContinuous: 'instantaneous',
        slideStep: 'slide',
        fixationTrailLength: 10,
      }).getHulls()[0];

      let trace = hull.getCentroidTrace({ initial: true });

      chai.expect(trace.name).to.equal('Centroid');
      chai.expect(trace.x).to.eql([ 375 ]);
      chai.expect(trace.y).to.eql([ 416 + 2/3 ]);
    });

    it('gets a centroid trace (not initial)', () => {
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

      let hull = viewing.plotHullSeries({
        instantContinuous: 'instantaneous',
        slideStep: 'slide',
        fixationTrailLength: 10,
      }).getHulls()[3];

      let trace = hull.getCentroidTrace({ initial: false });

      chai.expect(trace.name).to.be.an('undefined');
      chai.expect(trace.x).to.eql([ 600 ]);
      chai.expect(trace.y).to.eql([ 366 + 2/3 ]);
    });
  });
}
