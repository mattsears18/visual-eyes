// import { Factory } from 'meteor/dburles:factory';

// require('../../factories.test');
// const { expect } = require('chai');

// describe('INTEGRATION Datafiles.getAssignedRows()', () => {
//   // THESE ARE ACTUALLY INTEGRATION TESTS!
//   it('assigns stimuli and aois to each row in a real imotions file', async () => {
//     const datafile = Factory.create('imotionsDatafile');
//     datafile.fileFormat = 'imotions';
//     const rawData = await datafile.getRawData();

//     expect(rawData[0].stimulusId).to.be.undefined;
//     expect(rawData[0].aoiId).to.be.undefined;
//     expect(rawData[rawData.length - 1].stimulusId).to.be.undefined;
//     expect(rawData[rawData.length - 1].aoiId).to.be.undefined;

//     const renamedRows = datafile.renameRows(rawData);
//     const validCoordinates = datafile.getValidCoordinatesOnly(renamedRows);
//     const assignedRows = datafile.getAssignedRows(validCoordinates);

//     expect(assignedRows.length).to.equal(12271); // verified in excel (all rows)

//     const stimuli = Stimuli.find(
//       { studyId: datafile.studyId },
//       { sort: { name: 1 } },
//     ).fetch();

//     expect(stimuli.length).to.equal(3); // 'Mapping 1', '-' and 'smiGlasses'

//     expect(stimuli[0].name).to.equal('-');
//     expect(stimuli[1].name).to.equal('Mapping 1');
//     expect(stimuli[2].name).to.equal('smiGlasses');

//     const aois = Aois.find({ studyId: datafile.studyId }).fetch();
//     expect(aois.length).to.equal(3);

//     expect(assignedRows[0].stimulusId).to.exist;
//     expect(assignedRows[0].aoiId).to.exist;
//     expect(assignedRows[assignedRows.length - 1].stimulusId).to.exist;
//     expect(assignedRows[assignedRows.length - 1].aoiId).to.exist;
//   }).timeout(60000);

//   it('assigns stimuli and aois to each row in a real smi file', async () => {
//     const datafile = Factory.create('smiDatafile');
//     datafile.fileFormat = 'smi';
//     const rawData = await datafile.getRawData();
//     expect(rawData.length).to.equal(12742);

//     expect(rawData[0].stimulusId).to.be.undefined;
//     expect(rawData[0].aoiId).to.be.undefined;
//     expect(rawData[rawData.length - 1].stimulusId).to.be.undefined;
//     expect(rawData[rawData.length - 1].aoiId).to.be.undefined;

//     const timestampedData = datafile.mergeVideoStimulusRows(rawData);
//     expect(timestampedData.length).to.equal(6981); // verified in Excel (all of the '.avi' rows)

//     const renamedRows = datafile.renameRows(timestampedData);
//     const assignedRows = datafile.getAssignedRows(renamedRows);

//     expect(assignedRows.length).to.equal(6981); // verified in Excel (all of the '.avi' rows)

//     const stimuli = Stimuli.find(
//       { studyId: datafile.studyId },
//       { sort: { name: 1 } },
//     ).fetch();
//     // expect(stimuli.length).to.equal(2); '-' and 'ImageA'
//     expect(stimuli[0].name).to.equal('-');
//     expect(stimuli[1].name).to.equal('ImageA');

//     const aois0 = Aois.find({
//       studyId: datafile.studyId,
//       stimulusId: stimuli[0]._id,
//     }).fetch();

//     expect(aois0.length).to.equal(1);
//     expect(aois0[0].name).to.equal('-');

//     const aois1 = Aois.find(
//       {
//         studyId: datafile.studyId,
//         stimulusId: stimuli[1]._id,
//       },
//       { sort: { name: 1 } },
//     ).fetch();

//     expect(aois1.length).to.equal(1);
//     expect(aois1[0].name).to.equal('Image A');

//     expect(assignedRows[0].stimulusId).to.exist;
//     expect(assignedRows[0].aoiId).to.exist;
//     expect(assignedRows[assignedRows.length - 1].stimulusId).to.exist;
//     expect(assignedRows[assignedRows.length - 1].aoiId).to.exist;
//   }).timeout(60000);

//   it('assigns stimuli and aois to each row in a real smi file with multiple stimuli', async () => {
//     const datafile = Factory.create('smiMultiDatafile');
//     datafile.fileFormat = 'smi';
//     const rawData = await datafile.getRawData();

//     expect(rawData[0].stimulusId).to.be.undefined;
//     expect(rawData[0].aoiId).to.be.undefined;
//     expect(rawData[rawData.length - 1].stimulusId).to.be.undefined;
//     expect(rawData[rawData.length - 1].aoiId).to.be.undefined;

//     const timestampedData = datafile.mergeVideoStimulusRows(rawData);
//     const renamedRows = datafile.renameRows(timestampedData);
//     const assignedRows = datafile.getAssignedRows(renamedRows);

//     expect(assignedRows.length).to.equal(104429); // verified in Excel (all of the '.avi' rows)

//     const stimuli = Stimuli.find({ studyId: datafile.studyId }).fetch();
//     expect(stimuli.length).to.equal(11); // "Spool 1" through "Spool 10" and "-"

//     const aois = Aois.find(
//       { studyId: datafile.studyId },
//       { sort: { name: 1 } },
//     ).fetch();
//     expect(aois.length).to.equal(12); // verified in Excel - "Spool 1" through "Spool 10", "-", and "White Space" on "Spool 7" (index 3986)

//     // NOTE Spool 8 has a "white space" at index 3574 and  but they get removed because they are recordingTime duplicates

//     expect(aois.map(aoi => aoi.name)).to.eql([
//       '-',
//       'Spool 1',
//       'Spool 10',
//       'Spool 2',
//       'Spool 3',
//       'Spool 4',
//       'Spool 5',
//       'Spool 6',
//       'Spool 7',
//       'Spool 8',
//       'Spool 9',
//       'White Space',
//     ]);

//     expect(assignedRows[0].stimulusId).to.exist;
//     expect(assignedRows[0].aoiId).to.exist;
//     expect(assignedRows[assignedRows.length - 1].stimulusId).to.exist;
//     expect(assignedRows[assignedRows.length - 1].aoiId).to.exist;
//   }).timeout(60000);
// });
