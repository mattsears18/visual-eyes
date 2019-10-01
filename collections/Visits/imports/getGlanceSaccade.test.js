// import '../../factories.test';

// import { Factory } from 'meteor/dburles:factory';
// import { expect } from 'chai';

// describe('Visits.getGlanceSaccade()', () => {
//   it('has no fixation indices', () => {
//     const visit = Factory.create('visit', { fixationIndices: [] });

//     expect(() => {
//       visit.getGlanceSaccade();
//     }).to.throw(/^noFixationIndices$/);

//     const visit2 = Factory.create('visit');
//     delete visit2.fixationIndices;

//     expect(() => {
//       visit2.getGlanceSaccade();
//     }).to.throw(/^noFixationIndices$/);
//   });

//   it('has a leading saccade', () => {
//     const participant = Factory.create('participant');

//     const rows = [
//       {
//         type: 'Fixation',
//         combinedEventIndex: 1,
//         timestamp: 100,
//       },
//       {
//         type: 'Saccade',
//         combinedEventIndex: 2,
//         timestamp: 200,
//       },
//       {
//         type: 'Fixation',
//         combinedEventIndex: 3,
//         timestamp: 300,
//       },
//       {
//         type: 'Saccade',
//         combinedEventIndex: 4,
//         timestamp: 400,
//       },
//       {
//         type: 'Fixation',
//         combinedEventIndex: 5,
//         timestamp: 500,
//       },
//       {
//         type: 'Saccade',
//         combinedEventIndex: 6,
//         timestamp: 600,
//       },
//     ];

//     rows.forEach((row) => {
//       Factory.create('eyeevent', {
//         participantId: participant._id,
//         ...row,
//       });
//     });

//     const visit = Factory.create('visit', {
//       participantId: participant._id,
//       fixationIndices: [3, 5],
//     });

//     const glanceSaccade = visit.getGlanceSaccade();
//     expect(glanceSaccade.combinedEventIndex).to.equal(2);
//     expect(glanceSaccade.timestamp).to.equal(200);
//   });
//   // it('only has a trailing saccade', () => {
//   //   const participant = Factory.create('participant');

//   //   const rows = [
//   //     {
//   //       type: 'Fixation',
//   //       combinedEventIndex: 1,
//   //       timestamp: 100,
//   //     },
//   //     {
//   //       type: 'Saccade',
//   //       combinedEventIndex: 2,
//   //       timestamp: 200,
//   //     },
//   //     {
//   //       type: 'Fixation',
//   //       combinedEventIndex: 3,
//   //       timestamp: 300,
//   //     },
//   //     {
//   //       type: 'Saccade',
//   //       combinedEventIndex: 4,
//   //       timestamp: 400,
//   //     },
//   //     {
//   //       type: 'Fixation',
//   //       combinedEventIndex: 5,
//   //       timestamp: 500,
//   //     },
//   //     {
//   //       type: 'Saccade',
//   //       combinedEventIndex: 6,
//   //       timestamp: 600,
//   //     },
//   //   ];

//   //   rows.forEach((row) => {
//   //     Factory.create('eyeevent', {
//   //       participantId: participant._id,
//   //       ...row,
//   //     });
//   //   });

//   //   const visit = Factory.create('visit', {
//   //     participantId: participant._id,
//   //     combinedEventIndexStart: 1,
//   //     combinedEventIndexEnd: 5,
//   //   });

//   //   const glanceSaccade = visit.getGlanceSaccade();
//   //   expect(glanceSaccade.combinedEventIndex).to.equal(6);
//   //   expect(glanceSaccade.timestamp).to.equal(600);
//   // });
// });
