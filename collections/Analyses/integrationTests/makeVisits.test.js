// it('makes visits for a real smi file', async () => {
//   const study = Factory.create('study');
//   let datafile = Factory.create('smiMultiDatafile', { studyId: study._id });

//   datafile = await datafile.process();
//   datafile = Datafiles.findOne({ _id: datafile._id });

//   const participants = Participants.find({ studyId: study._id }).fetch();
//   const participant = participants[0];

//   const stimuli = Stimuli.find({ studyId: study._id }).fetch();

//   const analysis = Factory.create('analysis', {
//     studyId: study._id,
//     participantIds: participants.map(_ => _._id),
//     stimulusIds: stimuli.map(_ => _._id),
//   });

//   const fixations = Eyeevents.find(
//     { participantId: participant._id, type: 'fixation' },
//     {
//       fields: {
//         _id: 1,
//         timestamp: 1,
//         timestampEnd: 1,
//         datafileId: 1,
//         stimulusId: 1,
//         aoiId: 1,
//         x: 0,
//         y: 0,
//         eventIndex: 1,
//         duration: 1,
//         participantId: 1,
//       },
//       sort: { datafileId: 1, stimulusId: 1, eventIndex: 1 },
//     },
//   ).fetch();

//   analysis.makeVisits({ participantId: participant._id, fixations });

//   const visits = Visits.find({ analysisId: analysis._id }).fetch();
//   expect(visits.length).to.equal(10);

//   visits.forEach((visit) => {
//     expect(visit.number).to.equal(1);
//   });

//   const aois = Aois.find({ studyId: study._id });
//   expect(aois.count()).to.equal(28);

//   const aoiNames = visits.map(_ => _.aoi().name);
//   aoiNames.sort();

//   expect(aoiNames).to.eql([
//     'Spool 1',
//     'Spool 10',
//     'Spool 2',
//     'Spool 3',
//     'Spool 4',
//     'Spool 5',
//     'Spool 6',
//     'Spool 7',
//     'Spool 8',
//     'Spool 9',
//   ]);
// }).timeout(60000);
