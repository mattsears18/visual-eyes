// import '../../factories.test';
// import { Factory } from 'meteor/dburles:factory';
// import { expect } from 'chai';

// describe('Analyses.getVisitEndIndex()', () => {
//   it('has has a startIndex that is too high', async () => {
//     const analysis = Factory.create('analysis', {
//       minVisitDuration: 10000,
//       maxVisitGapDuration: 5000,
//     });

//     const fixations = [
//       { timestamp: 0 },
//       { timestamp: 1000 },
//       { timestamp: 2000 },
//       { timestamp: 3000 },
//       { timestamp: 4000 },
//     ];
//     expect(() => {
//       analysis.getVisitEndIndex({ fixations, startIndex: 4 });
//     }).to.throw(/^startIndexTooHigh$/);
//   });

//   it('does not have a timestamp and timestampEnd for every fixation', () => {
//     const analysis = Factory.create('analysis', {
//       minVisitDuration: 10000,
//       maxVisitGapDuration: 500,
//     });

//     const fixations = [
//       { timestamp: 0 },
//       { timestamp: 1000, timestampEnd: 1500 },
//       { timestamp: 2000, timestampEnd: 2500 },
//       { timestamp: 3000, timestampEnd: 3500 },
//       { timestamp: 4000, timestampEnd: 4500 },
//     ];
//     expect(() => {
//       analysis.getVisitEndIndex({ fixations, startIndex: 0 });
//     }).to.throw(/^missingTimestampOrTimestampEnd$/);

//     const fixations2 = [
//       { timestamp: 0, timestampEnd: 500 },
//       { timestamp: 1000, timestampEnd: 1500 },
//       { timestampEnd: 2500 },
//       { timestamp: 3000, timestampEnd: 3500 },
//       { timestamp: 4000, timestampEnd: 4500 },
//     ];
//     expect(() => {
//       analysis.getVisitEndIndex({ fixations: fixations2, startIndex: 0 });
//     }).to.throw(/^missingTimestampOrTimestampEnd$/);
//   });

//   it('has no aoiId', async () => {
//     const analysis = Factory.create('analysis', {
//       minVisitDuration: 5000,
//       maxVisitGapDuration: 5000,
//     });
//     const fixations = [
//       { timestamp: 0, timestampEnd: 500 },
//       { timestamp: 1000, timestampEnd: 1500 },
//       { timestamp: 2000, timestampEnd: 2500 },
//       { timestamp: 3000, timestampEnd: 3500 },
//       { timestamp: 4000, timestampEnd: 4500 },
//       { timestamp: 5000, timestampEnd: 5500 },
//     ];
//     expect(() => {
//       analysis.getVisitEndIndex({ fixations });
//     }).to.throw(/^noAoiId$/);
//   });

//   it('has a nonexistent aoi', () => {
//     const analysis = Factory.create('analysis', {
//       minVisitDuration: 5000,
//       maxVisitGapDuration: 5000,
//     });

//     const fixations = [
//       { timestamp: 0, timestampEnd: 500, aoiId: 'iGotAFakeIdDoe' },
//       { timestamp: 1000, timestampEnd: 1500, aoiId: 'iGotAFakeIdDoe' },
//       { timestamp: 2000, timestampEnd: 2500, aoiId: 'iGotAFakeIdDoe' },
//       { timestamp: 3000, timestampEnd: 3500, aoiId: 'iGotAFakeIdDoe' },
//       { timestamp: 4000, timestampEnd: 4500, aoiId: 'iGotAFakeIdDoe' },
//       { timestamp: 5000, timestampEnd: 5500, aoiId: 'iGotAFakeIdDoe' },
//     ];

//     expect(() => {
//       analysis.getVisitEndIndex({ fixations });
//     }).to.throw(/^noAoiFound$/);
//   });

//   describe('type !== iso15007', () => {
//     it('gets the endIndex', async () => {
//       const analysis = Factory.create('analysis', {
//         minVisitDuration: 5000,
//         maxVisitGapDuration: 5000,
//       });

//       const aoi = Factory.create('aoi');

//       const fixations = [
//         { timestamp: 0, timestampEnd: 500, aoiId: aoi._id },
//         { timestamp: 1000, timestampEnd: 1500, aoiId: aoi._id },
//         { timestamp: 2000, timestampEnd: 2500, aoiId: aoi._id },
//         { timestamp: 3000, timestampEnd: 3500, aoiId: aoi._id },
//         { timestamp: 4000, timestampEnd: 4500, aoiId: aoi._id },
//         { timestamp: 5000, timestampEnd: 5500, aoiId: aoi._id },
//         { timestamp: 6000, timestampEnd: 6500, aoiId: aoi._id },
//         { timestamp: 7000, timestampEnd: 7500, aoiId: aoi._id },
//         { timestamp: 8000, timestampEnd: 8500, aoiId: aoi._id },
//         { timestamp: 9000, timestampEnd: 9500, aoiId: aoi._id },
//       ];
//       expect(analysis.getVisitEndIndex({ fixations })).to.equal(9);
//     });
//     it('exceeds the maxVisitGapDuration', async () => {
//       const analysis = Factory.create('analysis', {
//         type: 'custom',
//         minVisitDuration: 3000,
//         maxVisitGapDuration: 5000,
//       });

//       const aoi = Factory.create('aoi');

//       const fixations = [
//         { timestamp: 0, timestampEnd: 500, aoiId: aoi._id },
//         { timestamp: 1000, timestampEnd: 1500, aoiId: aoi._id },
//         { timestamp: 2000, timestampEnd: 2500, aoiId: aoi._id },
//         { timestamp: 3000, timestampEnd: 3500, aoiId: aoi._id },
//         { timestamp: 4000, timestampEnd: 4500, aoiId: aoi._id },
//         { timestamp: 15000, timestampEnd: 5500, aoiId: aoi._id }, // 10500 ms gap!
//         { timestamp: 16000, timestampEnd: 6500, aoiId: aoi._id },
//       ];
//       expect(analysis.getVisitEndIndex({ fixations })).to.equal(4);
//     });
//     it('exceeds maxVisitGapDuration but does not meet the minVisitDuration', async () => {
//       const analysis = Factory.create('analysis', {
//         type: 'custom',
//         minVisitDuration: 10000,
//         maxVisitGapDuration: 5000,
//       });

//       const aoi = Factory.create('aoi');

//       const fixations = [
//         { timestamp: 0, timestampEnd: 500, aoiId: aoi._id },
//         { timestamp: 1000, timestampEnd: 1500, aoiId: aoi._id },
//         { timestamp: 2000, timestampEnd: 2500, aoiId: aoi._id },
//         { timestamp: 3000, timestampEnd: 3500, aoiId: aoi._id },
//         { timestamp: 4000, timestampEnd: 4500, aoiId: aoi._id },
//         { timestamp: 15000, timestampEnd: 15500, aoiId: aoi._id }, // exceeds MVGD
//         { timestamp: 16000, timestampEnd: 16500, aoiId: aoi._id },
//       ];

//       expect(() => {
//         analysis.getVisitEndIndex({ fixations });
//       }).to.throw('minVisitDurationNotMet');
//       try {
//         analysis.getVisitEndIndex({ fixations });
//       } catch (err) {
//         expect(err.details.nextIndex).to.equal(5);
//       }
//     });

//     it('ends on the last fixation matching the initial aoi when the aoi changes', async () => {
//       const analysis = Factory.create('analysis', {
//         type: 'custom',
//         minVisitDuration: 3000,
//         maxVisitGapDuration: 5000,
//       });

//       const aoi = Factory.create('aoi');
//       const aoi2 = Factory.create('aoi');

//       const fixations = [
//         { timestamp: 0, timestampEnd: 500, aoiId: aoi._id },
//         { timestamp: 1000, timestampEnd: 1500, aoiId: aoi._id },
//         { timestamp: 2000, timestampEnd: 2500, aoiId: aoi._id },
//         { timestamp: 3000, timestampEnd: 3500, aoiId: aoi._id },
//         { timestamp: 4000, timestampEnd: 4500, aoiId: aoi._id },
//         // aoi changed and never went back
//         { timestamp: 5000, timestampEnd: 5500, aoiId: aoi2._id },
//         { timestamp: 6000, timestampEnd: 6500, aoiId: aoi2._id },
//         { timestamp: 7000, timestampEnd: 7500, aoiId: aoi2._id },
//       ];
//       expect(analysis.getVisitEndIndex({ fixations })).to.equal(4);
//     });

//     it('can have a gap with fixations from another aoi', async () => {
//       const analysis = Factory.create('analysis', {
//         type: 'custom',
//         minVisitDuration: 3000,
//         maxVisitGapDuration: 5000,
//       });

//       const aoi = Factory.create('aoi');
//       const aoi2 = Factory.create('aoi');

//       const fixations = [
//         { timestamp: 0, timestampEnd: 500, aoiId: aoi._id },
//         { timestamp: 1000, timestampEnd: 1500, aoiId: aoi._id },
//         { timestamp: 2000, timestampEnd: 2500, aoiId: aoi._id },
//         { timestamp: 3000, timestampEnd: 3500, aoiId: aoi._id },
//         { timestamp: 4000, timestampEnd: 4500, aoiId: aoi._id },
//         { timestamp: 5000, timestampEnd: 5500, aoiId: aoi2._id }, // 3500 ms gap
//         { timestamp: 6000, timestampEnd: 6500, aoiId: aoi2._id }, // 3500 ms gap
//         { timestamp: 7000, timestampEnd: 7500, aoiId: aoi2._id }, // 3500 ms gap
//         { timestamp: 8000, timestampEnd: 8500, aoiId: aoi._id },
//         { timestamp: 9000, timestampEnd: 9500, aoiId: aoi._id },
//       ];
//       expect(analysis.getVisitEndIndex({ fixations })).to.equal(9);
//     });

//     it('looks at another aoi too long', async () => {
//       const analysis = Factory.create('analysis', {
//         type: 'custom',
//         minVisitDuration: 3000,
//         maxVisitGapDuration: 3000,
//       });

//       const aoi = Factory.create('aoi');
//       const aoi2 = Factory.create('aoi');

//       const fixations = [
//         { timestamp: 0, timestampEnd: 500, aoiId: aoi._id },
//         { timestamp: 1000, timestampEnd: 1500, aoiId: aoi._id },
//         { timestamp: 2000, timestampEnd: 2500, aoiId: aoi._id },
//         { timestamp: 3000, timestampEnd: 3500, aoiId: aoi._id },
//         { timestamp: 4000, timestampEnd: 4500, aoiId: aoi._id },
//         { timestamp: 5000, timestampEnd: 5500, aoiId: aoi2._id }, // 3500 ms gap
//         { timestamp: 6000, timestampEnd: 6500, aoiId: aoi2._id }, // 3500 ms gap
//         { timestamp: 7000, timestampEnd: 7500, aoiId: aoi2._id }, // 3500 ms gap
//         { timestamp: 8000, timestampEnd: 8500, aoiId: aoi._id },
//         { timestamp: 9000, timestampEnd: 9500, aoiId: aoi._id },
//       ];
//       expect(analysis.getVisitEndIndex({ fixations })).to.equal(4);
//     });

//     it('does not end if a fixation does not have a aoi', () => {
//       const analysis = Factory.create('analysis', {
//         type: 'custom',
//         minVisitDuration: 1000,
//       });

//       const aoi1 = Factory.create('aoi');

//       const fixations = [
//         { timestamp: 0, timestampEnd: 500, aoiId: aoi1._id },
//         { timestamp: 1000, timestampEnd: 1500, aoiId: aoi1._id },
//         { timestamp: 2000, timestampEnd: 2500, aoiId: aoi1._id },
//         { timestamp: 3000, timestampEnd: 3500, aoiId: aoi1._id },
//         { timestamp: 4000, timestampEnd: 4500, aoiId: aoi1._id },
//         { timestamp: 5000, timestampEnd: 5500 },
//         { timestamp: 6000, timestampEnd: 6500, aoiId: aoi1._id },
//         { timestamp: 7000, timestampEnd: 7500, aoiId: aoi1._id },
//         { timestamp: 8000, timestampEnd: 8500, aoiId: aoi1._id },
//         { timestamp: 9000, timestampEnd: 9500, aoiId: aoi1._id },
//       ];

//       expect(analysis.getVisitEndIndex({ fixations })).to.equal(9);
//     });
//   });

//   describe('type === iso15007', () => {
//     it('has a large visit gap but thats okay!', () => {
//       const analysis = Factory.create('analysis', {
//         type: 'iso15007',
//         minVisitDuration: 10000,
//       });

//       const aoi = Factory.create('aoi');

//       const fixations = [
//         { timestamp: 0, timestampEnd: 500, aoiId: aoi._id },
//         { timestamp: 1000, timestampEnd: 1500, aoiId: aoi._id },
//         { timestamp: 2000, timestampEnd: 2500, aoiId: aoi._id },
//         { timestamp: 3000, timestampEnd: 3500, aoiId: aoi._id },
//         { timestamp: 4000, timestampEnd: 4500, aoiId: aoi._id },
//         { timestamp: 15000, timestampEnd: 15500, aoiId: aoi._id }, // 10,500ms gap - OK
//         { timestamp: 16000, timestampEnd: 16500, aoiId: aoi._id },
//         { timestamp: 17000, timestampEnd: 17500, aoiId: aoi._id },
//         { timestamp: 18000, timestampEnd: 18500, aoiId: aoi._id },
//         { timestamp: 19000, timestampEnd: 19500, aoiId: aoi._id },
//       ];

//       expect(analysis.getVisitEndIndex({ fixations })).to.equal(9);
//     });
//     it('ends when the aoi changes', () => {
//       const analysis = Factory.create('analysis', {
//         type: 'iso15007',
//         minVisitDuration: 1000,
//       });

//       const aoi1 = Factory.create('aoi');
//       const aoi2 = Factory.create('aoi');

//       const fixations = [
//         { timestamp: 0, timestampEnd: 500, aoiId: aoi1._id },
//         { timestamp: 1000, timestampEnd: 1500, aoiId: aoi1._id },
//         { timestamp: 2000, timestampEnd: 2500, aoiId: aoi1._id },
//         { timestamp: 3000, timestampEnd: 3500, aoiId: aoi1._id },
//         { timestamp: 4000, timestampEnd: 4500, aoiId: aoi1._id },
//         { timestamp: 5000, timestampEnd: 5500, aoiId: aoi2._id },
//         { timestamp: 6000, timestampEnd: 6500, aoiId: aoi1._id },
//         { timestamp: 7000, timestampEnd: 7500, aoiId: aoi1._id },
//         { timestamp: 8000, timestampEnd: 8500, aoiId: aoi1._id },
//         { timestamp: 9000, timestampEnd: 9500, aoiId: aoi1._id },
//       ];

//       expect(analysis.getVisitEndIndex({ fixations })).to.equal(4);
//     });

//     it('ends when a fixation does not have a aoi', () => {
//       const analysis = Factory.create('analysis', {
//         type: 'iso15007',
//         minVisitDuration: 1000,
//       });

//       const aoi1 = Factory.create('aoi');

//       const fixations = [
//         { timestamp: 0, timestampEnd: 500, aoiId: aoi1._id },
//         { timestamp: 1000, timestampEnd: 1500, aoiId: aoi1._id },
//         { timestamp: 2000, timestampEnd: 2500, aoiId: aoi1._id },
//         { timestamp: 3000, timestampEnd: 3500, aoiId: aoi1._id },
//         { timestamp: 4000, timestampEnd: 4500, aoiId: aoi1._id },
//         { timestamp: 5000, timestampEnd: 5500 },
//         { timestamp: 6000, timestampEnd: 6500, aoiId: aoi1._id },
//         { timestamp: 7000, timestampEnd: 7500, aoiId: aoi1._id },
//         { timestamp: 8000, timestampEnd: 8500, aoiId: aoi1._id },
//         { timestamp: 9000, timestampEnd: 9500, aoiId: aoi1._id },
//       ];

//       expect(analysis.getVisitEndIndex({ fixations })).to.equal(4);
//     });
//   });
// });
