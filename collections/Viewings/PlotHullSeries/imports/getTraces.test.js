require('../../../factories.test');

if(Meteor.isServer) {
  describe('PlotHullSeries.getTraces()', () => {
    it('gets the initial traces', () => {
      let study = Factory.create('study', { fixationsOnly: false });
      let stimulusfile = Factory.create('stimulusfile', { studyId: study._id });
      let stimulus = Factory.create('stimulus', {
        studyId: study._id,
        stimulusfileId: stimulusfile._id,
        width: stimulusfile.fileWidth,
        height: stimulusfile.fileHeight,
      });
      let viewing = Factory.create('viewing', {
        studyId: study._id,
        stimulusId: stimulus._id,
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

      let hullSeries = viewing.plotHullSeries({
        instantContinuous: 'instantaneous',
        slideStep: 'slide',
        fixationTrailLength: 10,
      });

      let traces = hullSeries.getTraces({ initial: true });

      chai.expect(hullSeries.fixationTrailLength).to.equal(10);
      chai.expect(traces.length).to.equal(6);

      chai.expect(traces[0].name).to.equal('Centroid Trail');
      chai.expect(traces[0].x).to.eql([ -10, -11 ]);
      chai.expect(traces[0].y).to.eql([ -10, -11 ]);

      chai.expect(traces[1].name).to.equal('Gaze Points');
      chai.expect(traces[1].x).to.eql([ 100, 200, 300, 400, 500, 600 ]);
      chai.expect(traces[1].y).to.eql([ 400, 300, 200, 100, 700, 600 ]);

      chai.expect(traces[2].name).to.equal('Last 10 Gaze Points');
      chai.expect(traces[2].x).to.eql([ 100, 200, 300, 400, 500, 600 ]);
      chai.expect(traces[2].y).to.eql([ 400, 300, 200, 100, 700, 600 ]);

      chai.expect(traces[3].name).to.equal('Convex Hull');
      chai.expect(traces[3].x).to.eql([ 600, 500, 100, 400, 600 ]);
      chai.expect(traces[3].y).to.eql([ 600, 700, 400, 100, 600 ]);

      chai.expect(traces[4].name).to.equal('Centroid');
      chai.expect(traces[4].x).to.eql([ 375 ]);
      chai.expect(traces[4].y).to.eql([ 416 + 2/3 ]);

      chai.expect(traces[5].name).to.equal('Last Fixation');
      chai.expect(traces[5].x).to.eql([ 600 ]);
      chai.expect(traces[5].y).to.eql([ 600 ]);
    });

    it('gets the traces (not initial)', () => {
      let study = Factory.create('study', { fixationsOnly: false });
      let stimulusfile = Factory.create('stimulusfile', { studyId: study._id });
      let stimulus = Factory.create('stimulus', {
        studyId: study._id,
        stimulusfileId: stimulusfile._id,
        width: stimulusfile.fileWidth,
        height: stimulusfile.fileHeight,
      });
      let viewing = Factory.create('viewing', {
        studyId: study._id,
        stimulusId: stimulus._id,
        period: 5000,
        gazepoints: [
          { x: 100, y: 400, timestamp: 0 },         // 0
          { x: 200, y: 300, timestamp: 1000 },      // 01
          { x: 300, y: 200, timestamp: 2000 },      // 012
          { x: 400, y: 100, timestamp: 3000 },      // 0123
          { x: 500, y: 700, timestamp: 4000 },      // 01234
          { x: 600, y: 600, timestamp: 5000 },      // 012345
          { x: 700, y: 500, timestamp: 6000 },      // 123456
          { x: 800, y: 400, timestamp: 7000 },      // 234567
          { x: 900, y: 300, timestamp: 8000 },      // 345678
          { x: 100, y: 200, timestamp: 9000 },      // 456789
          { x: 200, y: 100, timestamp: 10000 },     // 56789
          { x: 300, y: 400, timestamp: 11000 },     // 6789
          { x: 400, y: 300, timestamp: 12000 },     // 789
          { x: 500, y: 200, timestamp: 13000 },     // 89
          { x: 600, y: 100, timestamp: 14000 },     // 9
        ],
      });

      let hullSeries = viewing.plotHullSeries({
        instantContinuous: 'instantaneous',
        slideStep: 'slide',
        fixationTrailLength: 10,
      });

      let traces = hullSeries.getTraces({});
      chai.expect(traces.length).to.equal(10);

      // just check the last frame
      chai.expect(traces[9].name).to.equal(14000);
      chai.expect(traces[9].data.length).to.equal(6); // 6 traces

      chai.expect(traces[9].data[0].x.length).to.equal(10); //centroidTrailTrace
      chai.expect(traces[9].data[0].y.length).to.equal(10);

      chai.expect(traces[9].data[1].x.length).to.equal(6); //pointsTrace
      chai.expect(traces[9].data[1].y.length).to.equal(6);

      chai.expect(traces[9].data[2].x.length).to.equal(10); //lastFixationTrailTrace
      chai.expect(traces[9].data[2].y.length).to.equal(10);

      chai.expect(traces[9].data[3].x.length).to.equal(5); //polygonTrace
      chai.expect(traces[9].data[3].y.length).to.equal(5);

      chai.expect(traces[9].data[4].x.length).to.equal(1); //centroidTrace
      chai.expect(traces[9].data[4].y.length).to.equal(1);

      chai.expect(traces[9].data[5].x.length).to.equal(1); //lastFixationTrace
      chai.expect(traces[9].data[5].y.length).to.equal(1);
    });
  });
}
