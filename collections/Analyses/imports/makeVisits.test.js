// import '../../factories.test';
// import { Factory } from 'meteor/dburles:factory';
// import { expect } from 'chai';
// import Eyeevents from '../../Eyeevents/Eyeevents';
// import Participants from '../../Participants/Participants';

// describe('Analyses.makeVisits()', () => {
//   it('provides no fixations', () => {
//     const analysis = Factory.create('analysis');
//     expect(() => {
//       analysis.makeVisits();
//     }).to.throw('noFixations');

//     expect(() => {
//       analysis.makeVisits({});
//     }).to.throw('noFixations');

//     expect(() => {
//       analysis.makeVisits({ fixations: [] });
//     }).to.throw('noFixations');
//   });

//   it('has no participantId', () => {
//     const analysis = Factory.create('analysis');
//     expect(() => {
//       analysis.makeVisits({ fixations: [{ type: 'fakeFixation' }] });
//     }).to.throw('noParticipantId');
//   });
//   it('has a nonexistent participant', () => {
//     const analysis = Factory.create('analysis');
//     expect(() => {
//       analysis.makeVisits({
//         participantId: 'abc',
//         fixations: [{ type: 'fakeFixation' }],
//       });
//     }).to.throw('noParticipantFound');
//   });

//   it('makes 2 visits', () => {
//     const study = Factory.create('study');
//     const participant = Factory.create('participant', { studyId: study._id });
//     const datafile = Factory.create('imotionsDatafile', {
//       studyId: study._id,
//       participantId: participant._id,
//     });
//     const stimulus = Factory.create('stimulus', { studyId: study._id });
//     const aoi = Factory.create('aoi', { stimulusId: stimulus._id });
//     const analysis = Factory.create('analysis', {
//       type: 'custom',
//       studyId: study._id,
//       participantIds: [participant._id],
//       stimulusIds: [stimulus._id],
//       minFixationDuration: null,
//       minVisitDuration: 5000,
//       maxVisitGapDuration: 2000,
//       ignoreOutsideImage: false,
//     });

//     const rows = [
//       { timestamp: 0, timestampEnd: 100 }, // start visit 1
//       { timestamp: 1000, timestampEnd: 1100 },
//       { timestamp: 2000, timestampEnd: 2100 },
//       { timestamp: 3000, timestampEnd: 3100 },
//       { timestamp: 5000, timestampEnd: 5100 }, // next fixation exceeds maxVisitGapDuration, end visit 1
//       { timestamp: 8000, timestampEnd: 8100 }, // exceeded maxVisitGapDuration
//       { timestamp: 9000, timestampEnd: 9100 }, // next fixation exceeds maxVisitGapDuration but minVisitDuration not met, so no visit
//       { timestamp: 14000, timestampEnd: 14100 }, // start visit 2
//       { timestamp: 15000, timestampEnd: 15100 },
//       { timestamp: 16000, timestampEnd: 16100 },
//       { timestamp: 17000, timestampEnd: 17100 },
//       { timestamp: 18000, timestampEnd: 18100 },
//       { timestamp: 19000, timestampEnd: 19100 },
//       { timestamp: 20000, timestampEnd: 20100 },
//       { timestamp: 21000, timestampEnd: 21100 },
//       { timestamp: 22000, timestampEnd: 22100 },
//       { timestamp: 23000, timestampEnd: 23100 }, // end visit 2
//     ];

//     rows.forEach((row) => {
//       Factory.create('fixation', {
//         studyId: study._id,
//         datafileId: datafile._id,
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//         aoiId: aoi._id,
//         ...row,
//       });
//     });

//     const fixations = Eyeevents.find(
//       {
//         participantId: participant._id,
//         stimulusId: stimulus._id,
//       },
//       { sort: { timestamp: 1 } },
//     ).fetch();

//     const visitIds = analysis.makeVisits({
//       participantId: participant._id,
//       fixations,
//     });

//     expect(visitIds.length).to.equal(2);

//     const visits = Visits.find(
//       { analysisId: analysis._id },
//       { sort: { timestamp: 1 } },
//     ).fetch();

//     expect(visits.length).to.equal(2);

//     expect(visits[0].timestamp).to.equal(0);
//     expect(visits[0].timestampEnd).to.equal(5100);
//     expect(visits[0].fixations.length).to.equal(5);
//     expect(visits[0].number).to.equal(1);

//     expect(visits[1].timestamp).to.equal(14000);
//     expect(visits[1].timestampEnd).to.equal(23100);
//     expect(visits[1].fixations.length).to.equal(10);
//     expect(visits[1].number).to.equal(2);
//   });

//   // it('makes visits for a real smi file', async () => {
//   //   const study = Factory.create('study');
//   //   let datafile = Factory.create('smiMultiDatafile', { studyId: study._id });

//   //   datafile = await datafile.process();
//   //   datafile = Datafiles.findOne({ _id: datafile._id });

//   //   const participants = Participants.find({ studyId: study._id }).fetch();
//   //   const participant = participants[0];

//   //   const stimuli = Stimuli.find({ studyId: study._id }).fetch();

//   //   const analysis = Factory.create('analysis', {
//   //     studyId: study._id,
//   //     participantIds: participants.map(_ => _._id),
//   //     stimulusIds: stimuli.map(_ => _._id),
//   //   });

//   //   const fixations = Eyeevents.find(
//   //     { participantId: participant._id, type: 'fixation' },
//   //     {
//   //       fields: {
//   //         _id: 1,
//   //         timestamp: 1,
//   //         timestampEnd: 1,
//   //         datafileId: 1,
//   //         stimulusId: 1,
//   //         aoiId: 1,
//   //         x: 0,
//   //         y: 0,
//   //         eventIndex: 1,
//   //         duration: 1,
//   //         participantId: 1,
//   //       },
//   //       sort: { datafileId: 1, stimulusId: 1, eventIndex: 1 },
//   //     },
//   //   ).fetch();

//   //   analysis.makeVisits({ participantId: participant._id, fixations });

//   //   const visits = Visits.find({ analysisId: analysis._id }).fetch();
//   //   expect(visits.length).to.equal(10);

//   //   visits.forEach((visit) => {
//   //     expect(visit.number).to.equal(1);
//   //   });

//   //   const aois = Aois.find({ studyId: study._id });
//   //   expect(aois.count()).to.equal(28);

//   //   const aoiNames = visits.map(_ => _.aoi().name);
//   //   aoiNames.sort();

//   //   expect(aoiNames).to.eql([
//   //     'Spool 1',
//   //     'Spool 10',
//   //     'Spool 2',
//   //     'Spool 3',
//   //     'Spool 4',
//   //     'Spool 5',
//   //     'Spool 6',
//   //     'Spool 7',
//   //     'Spool 8',
//   //     'Spool 9',
//   //   ]);
//   // }).timeout(60000);
// });
