// import '../../factories.test';
// import { Factory } from 'meteor/dburles:factory';
// import { expect } from 'chai';

// describe('Analyses.filterFixationsByDuration()', () => {
//   const testFixations = [
//     {
//       timestamp: 0,
//       timestampEnd: 16,
//     },
//     {
//       timestamp: 1000,
//       timestampEnd: 1030,
//     },
//     {
//       timestamp: 2000,
//       timestampEnd: 2060,
//     },
//     {
//       timestamp: 3000,
//       timestampEnd: 3080,
//     },
//     {
//       timestamp: 4000,
//       timestampEnd: 4100,
//     },
//     {
//       timestamp: 5000,
//       timestampEnd: 5120,
//     },
//     {
//       timestamp: 6000,
//       timestampEnd: 6121,
//     },
//     {
//       timestamp: 7000,
//       timestampEnd: 7200,
//     },
//     {
//       timestamp: 8000,
//       timestampEnd: 9000,
//     },
//   ];

//   it('provides no fixations', () => {
//     const analysis = Factory.create('analysis');
//     expect(analysis.filterFixationsByDuration).to.throw('noFixations');
//     expect(() => {
//       analysis.filterFixationsByDuration([]);
//     }).to.throw('noFixations');
//   });

//   it('has an undefined minimum fixation duration', () => {
//     const analysis = Factory.create('analysis', {
//       type: 'iso15007',
//     });

//     delete analysis.minFixationDuration;
//     expect(
//       analysis.filterFixationsByDuration(
//         testFixations,
//         analysis.minFixationDuration,
//       ),
//     ).to.eql(testFixations);
//   });

//   it('has a null minimum fixation duration', () => {
//     const analysis = Factory.create('analysis', {
//       type: 'iso15007',
//       minFixationDuration: null,
//     });

//     expect(
//       analysis.filterFixationsByDuration(
//         testFixations,
//         analysis.minFixationDuration,
//       ),
//     ).to.eql(testFixations);
//   });

//   it('filters by duration', () => {
//     const analysis = Factory.create('analysis', {
//       minFixationDuration: 121,
//     });

//     expect(
//       analysis.filterFixationsByDuration(
//         testFixations,
//         analysis.minFixationDuration,
//       ),
//     ).to.eql([
//       {
//         timestamp: 6000,
//         timestampEnd: 6121,
//       },
//       {
//         timestamp: 7000,
//         timestampEnd: 7200,
//       },
//       {
//         timestamp: 8000,
//         timestampEnd: 9000,
//       },
//     ]);
//   });
// });
