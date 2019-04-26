// describe('TimeHullSeries.getCentroidTrailTrace()', () => {
//   it('gets the initial centroid trail trace', () => {
//     let viewing = Factory.create('viewing', {
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
//     let series = viewing.timeHullSeries({
//       instantContinuous: 'instantaneous',
//       slideStep: 'slide',
//       pointTrailLength: 10,
//     });
//
//     let trace = series.getCentroidTrailTrace({ initial: true });
//
//     expect(trace.name).to.equal('Centroid Trail');
//     expect(trace.x).to.eql([ -10, -11 ]);
//     expect(trace.y).to.eql([ -10, -11 ]);
//   });
//
//   it('gets a centroid trail trace (not initial) for the first 5 hulls', () => {
//     let viewing = Factory.create('viewing', {
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
//     let series = viewing.timeHullSeries({
//       instantContinuous: 'instantaneous',
//       slideStep: 'slide',
//       pointTrailLength: 10,
//     });
//
//     let trace = series.getCentroidTrailTrace({ initial: false, endIndex: 4 });
//     expect(trace.name).to.be.an('undefined');
//     expect(trace.x).to.eql([ 375, 450, 525, 600, 500 ]);
//     expect(trace.y).to.eql([ 416.6666666666667, 400, 383.3333333333333, 366.6666666666667, 400 ]);
//   });
//
//   it('gets the centroid trail trace (not initial) for the first hull', () => {
//     let viewing = Factory.create('viewing', {
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
//     let series = viewing.timeHullSeries({
//       instantContinuous: 'instantaneous',
//       slideStep: 'slide',
//       pointTrailLength: 10,
//     });
//
//     let trace = series.getCentroidTrailTrace({ initial: false, endIndex: 0 });
//     expect(trace.name).to.be.an('undefined');
//     expect(trace.x).to.eql([ -10, -11 ]);
//     expect(trace.y).to.eql([ -10, -11 ]);
//   });
// });
