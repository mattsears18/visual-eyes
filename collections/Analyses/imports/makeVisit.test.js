// import '../../factories.test';
// import { Factory } from 'meteor/dburles:factory';
// import { expect } from 'chai';

// describe('Analyses.makeVisit()', () => {
//   it('has no fixations', () => {
//     const analysis = Factory.create('analysis');
//     expect(() => {
//       analysis.makeVisit();
//     }).to.throw('noFixations');

//     expect(() => {
//       analysis.makeVisit({});
//     }).to.throw('noFixations');
//   });

//   it('has an invalid startIndex', () => {
//     const analysis = Factory.create('analysis');
//     expect(() => {
//       analysis.makeVisit({
//         fixations: [{ timestamp: 0 }, { timestamp: 100 }],
//       });
//     }).to.throw('invalidStartIndex');
//     expect(() => {
//       analysis.makeVisit({
//         fixations: [{ timestamp: 0 }, { timestamp: 100 }],
//         startIndex: -2,
//       });
//     }).to.throw('invalidStartIndex');
//   });

//   it("has a startIndex that's too high", () => {
//     const analysis = Factory.create('analysis');

//     expect(() => {
//       analysis.makeVisit({
//         fixations: [{ timestamp: 0 }, { timestamp: 100 }],
//         startIndex: 1,
//       });
//     }).to.throw('startIndexTooHigh');

//     expect(() => {
//       analysis.makeVisit({
//         fixations: [{ timestamp: 0 }, { timestamp: 100 }, { timestamp: 200 }],
//         startIndex: 2,
//       });
//     }).to.throw('startIndexTooHigh');
//   });

//   it('has an invalid endIndex', () => {
//     const analysis = Factory.create('analysis');
//     expect(() => {
//       analysis.makeVisit({
//         fixations: [{ timestamp: 0 }, { timestamp: 100 }],
//         startIndex: 0,
//       });
//     }).to.throw('invalidEndIndex');

//     expect(() => {
//       analysis.makeVisit({
//         fixations: [{ timestamp: 0 }, { timestamp: 100 }],
//         startIndex: 0,
//         endIndex: 0,
//       });
//     }).to.throw('invalidEndIndex');

//     expect(() => {
//       analysis.makeVisit({
//         fixations: [
//           { timestamp: 0 },
//           { timestamp: 100 },
//           { timestamp: 200 },
//           { timestamp: 300 },
//           { timestamp: 400 },
//         ],
//         startIndex: 2,
//         endIndex: 2,
//       });
//     }).to.throw('invalidEndIndex');
//   });

//   it('has no participantId', () => {
//     const analysis = Factory.create('analysis');
//     expect(() => {
//       analysis.makeVisit({
//         fixations: [{ timestamp: 0 }, { timestamp: 100 }],
//         startIndex: 0,
//         endIndex: 1,
//       });
//     }).to.throw('noParticipantId');
//   });

//   it('has a nonexistent participant', () => {
//     const analysis = Factory.create('analysis');
//     expect(() => {
//       analysis.makeVisit({
//         fixations: [{ timestamp: 0, participantId: 'abc' }, { timestamp: 100 }],
//         startIndex: 0,
//         endIndex: 1,
//       });
//     }).to.throw('noParticipantFound');
//   });

//   it('has no aoiId', () => {
//     const analysis = Factory.create('analysis');
//     const participant = Factory.create('participant');

//     expect(() => {
//       analysis.makeVisit({
//         fixations: [
//           { timestamp: 0, participantId: participant._id },
//           { timestamp: 100 },
//         ],
//         startIndex: 0,
//         endIndex: 1,
//       });
//     }).to.throw('noAoiId');
//   });

//   it('has a nonexistent aoi', () => {
//     const analysis = Factory.create('analysis');
//     const participant = Factory.create('participant');

//     expect(() => {
//       analysis.makeVisit({
//         fixations: [
//           { timestamp: 0, participantId: participant._id, aoiId: 'abc' },
//           { timestamp: 100 },
//         ],
//         startIndex: 0,
//         endIndex: 1,
//       });
//     }).to.throw('noAoiFound');
//   });

//   it('successfully makes a visit', async () => {
//     const analysis = Factory.create('analysis');
//     const participant = Factory.create('participant');
//     const stimulus = Factory.create('stimulus');
//     const aoi = Factory.create('aoi');
//     const fixations = [
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 0,
//         timestampEnd: 500,
//         aoiId: aoi._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 1000,
//         timestampEnd: 1500,
//         aoiId: aoi._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 2000,
//         timestampEnd: 2500,
//         eventIndex: 1,
//         aoiId: aoi._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 3000,
//         timestampEnd: 3500,
//         aoiId: aoi._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 4000,
//         timestampEnd: 4500,
//         aoiId: aoi._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 5000,
//         timestampEnd: 5500,
//         eventIndex: 2,
//         aoiId: aoi._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 6000,
//         timestampEnd: 6500,
//         aoiId: aoi._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 7000,
//         timestampEnd: 7500,
//         aoiId: aoi._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 8000,
//         timestampEnd: 8500,
//         aoiId: aoi._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 9000,
//         timestampEnd: 9500,
//         aoiId: aoi._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 10000,
//         timestampEnd: 10500,
//         aoiId: aoi._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 11000,
//         timestampEnd: 11500,
//         aoiId: aoi._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//     ];

//     const visitId = analysis.makeVisit({
//       fixations,
//       startIndex: 2,
//       endIndex: 6,
//       number: 7,
//     });

//     const visit = Visits.findOne({ _id: visitId });

//     expect(visit.analysisId).to.equal(analysis._id);
//     expect(visit.timestamp).to.equal(2000);
//     expect(visit.timestampEnd).to.equal(6500);
//     expect(visit.duration).to.equal(4500);
//     expect(visit.number).to.equal(7);
//     expect(visit.participantId).to.equal(participant._id);
//     expect(visit.aoiId).to.equal(aoi._id);

//     expect(visit.fixations).to.eql([
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 2000,
//         timestampEnd: 2500,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 3000,
//         timestampEnd: 3500,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 4000,
//         timestampEnd: 4500,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 5000,
//         timestampEnd: 5500,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 6000,
//         timestampEnd: 6500,
//       },
//     ]);

//     expect(visit.fixationCount).to.equal(5);
//     expect(visit.fixationFrequency).to.equal(5 / 4.5);
//   });

//   it('makes a visit with other aois in the middle', async () => {
//     const analysis = Factory.create('analysis');
//     const participant = Factory.create('participant');
//     const stimulus = Factory.create('stimulus');
//     const aoi = Factory.create('aoi');
//     const aoi2 = Factory.create('aoi');
//     const fixations = [
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 0,
//         timestampEnd: 500,
//         aoiId: aoi._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 1000,
//         timestampEnd: 1500,
//         aoiId: aoi._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 2000,
//         timestampEnd: 2500,
//         eventIndex: 1,
//         aoiId: aoi._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 3000,
//         timestampEnd: 3500,
//         aoiId: aoi._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 4000,
//         timestampEnd: 4500,
//         aoiId: aoi2._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 5000,
//         timestampEnd: 5500,
//         eventIndex: 2,
//         aoiId: aoi2._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 6000,
//         timestampEnd: 6500,
//         aoiId: aoi._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 7000,
//         timestampEnd: 7500,
//         aoiId: aoi._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 8000,
//         timestampEnd: 8500,
//         aoiId: aoi._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 9000,
//         timestampEnd: 9500,
//         aoiId: aoi._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 10000,
//         timestampEnd: 10500,
//         aoiId: aoi._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 11000,
//         timestampEnd: 11500,
//         aoiId: aoi._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//     ];

//     const visitId = analysis.makeVisit({
//       fixations,
//       startIndex: 2,
//       endIndex: 6,
//       number: 7,
//     });

//     const visit = Visits.findOne({ _id: visitId });

//     expect(visit.analysisId).to.equal(analysis._id);
//     expect(visit.timestamp).to.equal(2000);
//     expect(visit.timestampEnd).to.equal(6500);
//     expect(visit.duration).to.equal(4500);
//     expect(visit.number).to.equal(7);
//     expect(visit.participantId).to.equal(participant._id);
//     expect(visit.aoiId).to.equal(aoi._id);

//     expect(visit.fixations).to.eql([
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 2000,
//         timestampEnd: 2500,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 3000,
//         timestampEnd: 3500,
//       },
//       {
//         x: 0.5,
//         y: 0.5,
//         timestamp: 6000,
//         timestampEnd: 6500,
//       },
//     ]);

//     expect(visit.fixationCount).to.equal(3);
//     expect(visit.fixationFrequency).to.equal(3 / 4.5);
//   });
// });
