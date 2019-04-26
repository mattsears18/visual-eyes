// describe('TimeHull.getLastPointTrace()', () => {
//   it('gets the initial last point trace', () => {
//     let study = Factory.create('study', { fixationsOnly: false });
//     let viewing = Factory.create('viewing', {
//       studyId: study._id,
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
//     }).getHulls()[0];
//
//     let trace = hull.getLastPointTrace({ initial: true });
//
//     expect(trace.name).to.equal('Last Fixation');
//     expect(trace.x).to.eql([ 600 ]);
//     expect(trace.y).to.eql([ 600 ]);
//   });
//
//   it('gets a last point trace (not initial)', () => {
//     let study = Factory.create('study', { fixationsOnly: false });
//     let viewing = Factory.create('viewing', {
//       studyId: study._id,
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
//     }).getHulls()[9];
//
//     let trace = hull.getLastPointTrace({ initial: false });
//
//     expect(trace.name).to.be.an('undefined');
//     expect(trace.x).to.eql([ 600 ]);
//     expect(trace.y).to.eql([ 100 ]);
//   });
// });
