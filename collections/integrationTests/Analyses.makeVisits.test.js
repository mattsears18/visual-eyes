// import '../factories.test';
// import { Factory } from 'meteor/dburles:factory';
// import { expect } from 'chai';
// import Eyeevents from '../Eyeevents/Eyeevents';
// import Participants from '../Participants/Participants';

// describe('INTEGRATION Analyses.makeVisits()', () => {
//   it('makes visits for a real smi file', async () => {
//     const study = Factory.create('study');
//     let datafile = Factory.create('smiMultiDatafile', { studyId: study._id });
//     datafile = await datafile.process();
//     const participants = Participants.find({ studyId: study._id }).fetch();
//     const participant = participants[0];
//     const stimuli = Stimuli.find({ studyId: study._id }).fetch();
//     const analysis = Factory.create('analysis', {
//       studyId: study._id,
//       participantIds: participants.map(_ => _._id),
//       stimulusIds: stimuli.map(_ => _._id),
//       minFixationDuration: 120,
//     });
//     const eyeevents = Eyeevents.find(
//       { participantId: participant._id, type: 'Fixation' },
//       {
//         fields: {
//           _id: 1,
//           type: 1,
//           timestamp: 1,
//           duration: 1,
//           participantId: 1,
//           stimulusId: 1,
//           aoiId: 1,
//           originalEventIndex: 1,
//           index: 1,
//         },
//         sort: { participantId: 1, timestamp: 1 },
//       },
//     ).fetch();

//     const visitIds = analysis.makeVisits({
//       participantId: participant._id,
//       eyeevents,
//     });

//     const visits = Visits.find(
//       { analysisId: analysis._id },
//       { sort: { number: 1 } },
//     ).fetch();

//     expect(visits.length).to.equal(197);

//     // for (let i = 0; i < 10; i += 1) {
//     //   console.log(visits[i]);
//     //   console.log(visits[i].stimulus().name);
//     //   console.log(visits[i].timestamp + visits[i].duration);
//     //   console.log('');
//     // }
//     //   const aois = Aois.find({ studyId: study._id });
//     //   expect(aois.count()).to.equal(28);
//     //   const aoiNames = visits.map(_ => _.aoi().name);
//     //   aoiNames.sort();
//     //   expect(aoiNames).to.eql([
//     //     'Spool 1',
//     //     'Spool 10',
//     //     'Spool 2',
//     //     'Spool 3',
//     //     'Spool 4',
//     //     'Spool 5',
//     //     'Spool 6',
//     //     'Spool 7',
//     //     'Spool 8',
//     //     'Spool 9',
//     //   ]);
//   }).timeout(60000);
// });
