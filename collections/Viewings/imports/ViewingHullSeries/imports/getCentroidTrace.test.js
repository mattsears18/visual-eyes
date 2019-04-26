// const TimeHull = require('../../lib/TimeHull');
// var expect     = require('chai').expect;
//
// describe.only('TimeHull.getCentroidTrace()', () => {
//   it('gets the initial centroid trace', () => {
//     let points = [
//       { x: 100, y: 400, timestamp: 0 },
//       { x: 200, y: 300, timestamp: 1000 },
//       { x: 300, y: 200, timestamp: 2000 },
//       { x: 400, y: 100, timestamp: 3000 },
//       { x: 500, y: 700, timestamp: 4000 },
//       { x: 600, y: 600, timestamp: 5000 },
//       { x: 700, y: 500, timestamp: 6000 },
//       { x: 800, y: 400, timestamp: 7000 },
//       { x: 900, y: 300, timestamp: 8000 },
//       { x: 100, y: 200, timestamp: 9000 },
//       { x: 200, y: 100, timestamp: 10000 },
//       { x: 300, y: 400, timestamp: 11000 },
//       { x: 400, y: 300, timestamp: 12000 },
//       { x: 500, y: 200, timestamp: 13000 },
//       { x: 600, y: 100, timestamp: 14000 },
//     ];
//
//     let timeHull = new TimeHull({ seriesPoints: points, pointTrailLength: 10 });
//     let trace = timeHull.getCentroidTrace({ initial: true });
//
//     expect(trace.name).to.equal('Centroid');
//     expect(trace.x).to.eql([ 375 ]);
//     expect(trace.y).to.eql([ 416 + 2/3 ]);
//   });
//
//   it('gets a centroid trace (not initial)', () => {
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
//     let hull = viewing.timeHullSeries({
//       instantContinuous: 'instantaneous',
//       slideStep: 'slide',
//       pointTrailLength: 10,
//     }).getHulls()[3];
//
//     let trace = hull.getCentroidTrace({ initial: false });
//
//     expect(trace.name).to.be.an('undefined');
//     expect(trace.x).to.eql([ 600 ]);
//     expect(trace.y).to.eql([ 366 + 2/3 ]);
//   });
// });
