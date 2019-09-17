// import '../../factories.test';
// import { Factory } from 'meteor/dburles:factory';
// import { expect } from 'chai';

// describe('Analyses.getVisitFixationCount()', () => {
//   it('dose not have fixations', () => {
//     const analysis = Factory.create('analysis');
//     const points = [
//       { timestamp: 0 },
//       { timestamp: 1000 },
//       { timestamp: 2000 },
//       { timestamp: 3000 },
//       { timestamp: 4000 },
//     ];

//     expect(analysis.getVisitFixationCount(points)).to.equal(0);
//   });

//   it('has duplicate fixation indices', () => {
//     const analysis = Factory.create('analysis');
//     const points = [
//       { timestamp: 0 },
//       { timestamp: 1000, eventIndex: 1 },
//       { timestamp: 2000, eventIndex: 1 },
//       { timestamp: 3000 },
//       { timestamp: 4000 },
//     ];

//     expect(analysis.getVisitFixationCount(points)).to.equal(1);
//   });

//   it('has fixations', () => {
//     const analysis = Factory.create('analysis');
//     const points = [
//       { timestamp: 0 },
//       { timestamp: 1000, eventIndex: 1 },
//       { timestamp: 2000, eventIndex: 2 },
//       { timestamp: 3000, eventIndex: 3 },
//       { timestamp: 4000 },
//     ];

//     expect(analysis.getVisitFixationCount(points)).to.equal(3);
//   });
// });
