// import { Factory } from 'meteor/dburles:factory';
// import Eyeevents from '../../Eyeevents/Eyeevents';

// require('../../factories.test');
// const { expect } = require('chai');

// if (Meteor.isServer) {
//   describe('Datafiles.makeEyeevents()', () => {
//     it('makes eyeevents for a real smi datafile', async () => {
//       const participant = Factory.create('participant');
//       const datafile = Factory.create('smiMultiDatafile', {
//         studyId: participant.studyId,
//         participantId: participant._id,
//       });
//       datafile.fileFormat = 'smi';
//       const rawData = await datafile.getRawData();
//       expect(rawData.length).to.equal(146558);

//       const timestampedRows = datafile.mergeVideoStimulusRows(rawData);
//       expect(timestampedRows.length).to.equal(102939);

//       const renamedRows = datafile.renameRows(timestampedRows);
//       expect(renamedRows.length).to.equal(102939);

//       const validCoordinateRows = datafile.getValidCoordinatesOnly(renamedRows);
//       const assignedRows = datafile.getAssignedRows(validCoordinateRows);
//       const sortedRows = assignedRows.sort((a, b) => a.timestamp - b.timestamp);

//       const events = datafile.generateSMIEyeevents(sortedRows);

//       const fixations = events.filter(event => event.type === 'Fixation');
//       const blinks = events.filter(event => event.type === 'Blink');
//       const saccades = events.filter(event => event.type === 'Saccade');

//       expect(fixations.length).to.equal(4628); // 10 bad fixation coordinates
//       expect(blinks.length).to.equal(152);
//       expect(saccades.length).to.equal(4474);

//       const eyeeventsStatus = await datafile.makeEyeevents(renamedRows);

//       expect(eyeeventsStatus.nInserted).to.equal(4628 + 152 + 4474);

//       expect(
//         Eyeevents.find({ datafileId: datafile._id, type: 'Fixation' }).count(),
//       ).to.equal(4628);
//       expect(
//         Eyeevents.find({ datafileId: datafile._id, type: 'Blink' }).count(),
//       ).to.equal(152);
//       expect(
//         Eyeevents.find({ datafileId: datafile._id, type: 'Saccade' }).count(),
//       ).to.equal(4474);
//     }).timeout(60000);
//   });
// }
