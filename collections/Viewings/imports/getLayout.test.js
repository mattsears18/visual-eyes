// describe('TimeHullSeries.getLayout()', () => {
//   it('gets the layout', () => {
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
//     let layout = hullSeries.getLayout();
//
//     expect(layout.height).to.equal(620);
//   });
// });
