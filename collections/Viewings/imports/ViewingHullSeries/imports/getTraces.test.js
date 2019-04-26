// describe('TimeHullSeries.getTraces()', () => {
//   it('gets the initial traces', () => {
//     let study = Factory.create('study', { fixationsOnly: false });
//     let stimulusfile = Factory.create('stimulusfile', { studyId: study._id });
//     let stimulus = Factory.create('stimulus', {
//       studyId: study._id,
//       stimulusfileId: stimulusfile._id,
//       width: stimulusfile.fileWidth,
//       height: stimulusfile.fileHeight,
//     });
//     let viewing = Factory.create('viewing', {
//       studyId: study._id,
//       stimulusId: stimulus._id,
//       period: 5000,
//       points: [
//         { x: 100, y: 400, timestamp: 0 },
//         { x: 200, y: 300, timestamp: 1000 },
//         { x: 300, y: 200, timestamp: 2000 },
//         { x: 400, y: 100, timestamp: 3000 },
//         { x: 500, y: 700, timestamp: 4000 },
//         { x: 600, y: 600, timestamp: 5000 },
//         { x: 700, y: 500, timestamp: 6000 },
//         { x: 800, y: 400, timestamp: 7000 },
//         { x: 900, y: 300, timestamp: 8000 },
//         { x: 100, y: 200, timestamp: 9000 },
//         { x: 200, y: 100, timestamp: 10000 },
//         { x: 300, y: 400, timestamp: 11000 },
//         { x: 400, y: 300, timestamp: 12000 },
//         { x: 500, y: 200, timestamp: 13000 },
//         { x: 600, y: 100, timestamp: 14000 },
//       ],
//     });
//
//     let hullSeries = viewing.timeHullSeries({
//       instantContinuous: 'instantaneous',
//       slideStep: 'slide',
//       pointTrailLength: 10,
//     });
//
//     let traces = hullSeries.getTraces({ initial: true });
//
//     expect(hullSeries.pointTrailLength).to.equal(10);
//     expect(traces.length).to.equal(6);
//
//     expect(traces[0].name).to.equal('Centroid Trail');
//     expect(traces[0].x).to.eql([ -10, -11 ]);
//     expect(traces[0].y).to.eql([ -10, -11 ]);
//
//     expect(traces[1].name).to.equal('Gaze Points');
//     expect(traces[1].x).to.eql([ 100, 200, 300, 400, 500, 600 ]);
//     expect(traces[1].y).to.eql([ 400, 300, 200, 100, 700, 600 ]);
//
//     expect(traces[2].name).to.equal('Last 10 Gaze Points');
//     expect(traces[2].x).to.eql([ 100, 200, 300, 400, 500, 600 ]);
//     expect(traces[2].y).to.eql([ 400, 300, 200, 100, 700, 600 ]);
//
//     expect(traces[3].name).to.equal('Convex Hull');
//     expect(traces[3].x).to.eql([ 600, 500, 100, 400, 600 ]);
//     expect(traces[3].y).to.eql([ 600, 700, 400, 100, 600 ]);
//
//     expect(traces[4].name).to.equal('Centroid');
//     expect(traces[4].x).to.eql([ 375 ]);
//     expect(traces[4].y).to.eql([ 416 + 2/3 ]);
//
//     expect(traces[5].name).to.equal('Last Fixation');
//     expect(traces[5].x).to.eql([ 600 ]);
//     expect(traces[5].y).to.eql([ 600 ]);
//   });
//
//   it('gets the traces (not initial)', () => {
//     let study = Factory.create('study', { fixationsOnly: false });
//     let stimulusfile = Factory.create('stimulusfile', { studyId: study._id });
//     let stimulus = Factory.create('stimulus', {
//       studyId: study._id,
//       stimulusfileId: stimulusfile._id,
//       width: stimulusfile.fileWidth,
//       height: stimulusfile.fileHeight,
//     });
//     let viewing = Factory.create('viewing', {
//       studyId: study._id,
//       stimulusId: stimulus._id,
//       period: 5000,
//       points: [
//         { x: 100, y: 400, timestamp: 0 },         // 0
//         { x: 200, y: 300, timestamp: 1000 },      // 01
//         { x: 300, y: 200, timestamp: 2000 },      // 012
//         { x: 400, y: 100, timestamp: 3000 },      // 0123
//         { x: 500, y: 700, timestamp: 4000 },      // 01234
//         { x: 600, y: 600, timestamp: 5000 },      // 012345
//         { x: 700, y: 500, timestamp: 6000 },      // 123456
//         { x: 800, y: 400, timestamp: 7000 },      // 234567
//         { x: 900, y: 300, timestamp: 8000 },      // 345678
//         { x: 100, y: 200, timestamp: 9000 },      // 456789
//         { x: 200, y: 100, timestamp: 10000 },     // 56789
//         { x: 300, y: 400, timestamp: 11000 },     // 6789
//         { x: 400, y: 300, timestamp: 12000 },     // 789
//         { x: 500, y: 200, timestamp: 13000 },     // 89
//         { x: 600, y: 100, timestamp: 14000 },     // 9
//       ],
//     });
//
//     let hullSeries = viewing.timeHullSeries({
//       instantContinuous: 'instantaneous',
//       slideStep: 'slide',
//       pointTrailLength: 10,
//     });
//
//     let traces = hullSeries.getTraces({});
//     expect(traces.length).to.equal(10);
//
//     // just check the last frame
//     expect(traces[9].name).to.equal(14000);
//     expect(traces[9].data.length).to.equal(6); // 6 traces
//
//     expect(traces[9].data[0].x.length).to.equal(10); //centroidTrailTrace
//     expect(traces[9].data[0].y.length).to.equal(10);
//
//     expect(traces[9].data[1].x.length).to.equal(6); //pointsTrace
//     expect(traces[9].data[1].y.length).to.equal(6);
//
//     expect(traces[9].data[2].x.length).to.equal(10); //lastpointTrailTrace
//     expect(traces[9].data[2].y.length).to.equal(10);
//
//     expect(traces[9].data[3].x.length).to.equal(5); //polygonTrace
//     expect(traces[9].data[3].y.length).to.equal(5);
//
//     expect(traces[9].data[4].x.length).to.equal(1); //centroidTrace
//     expect(traces[9].data[4].y.length).to.equal(1);
//
//     expect(traces[9].data[5].x.length).to.equal(1); //lastFixationTrace
//     expect(traces[9].data[5].y.length).to.equal(1);
//   });
// });
