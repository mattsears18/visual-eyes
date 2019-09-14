import { Factory } from 'meteor/dburles:factory';

require('../../factories.test');
const { expect } = require('chai');

describe('Datafiles.getAssignedRows()', () => {
  // it("doesn't pass rawData", () => {
  //   const datafile = Factory.create('imotionsDatafile');
  //   expect(() => {
  //     datafile.getAssignedRows();
  //   }).to.throw('noData');
  // });

  // it('assigns stimuli and aois to each row in a real imotions file', async () => {
  //   const datafile = Factory.create('imotionsDatafile');
  //   datafile.fileFormat = 'imotions';
  //   const rawData = await datafile.getRawData();

  //   expect(rawData[0].stimulusId).to.be.undefined;
  //   expect(rawData[0].aoiId).to.be.undefined;
  //   expect(rawData[rawData.length - 1].stimulusId).to.be.undefined;
  //   expect(rawData[rawData.length - 1].aoiId).to.be.undefined;

  //   const renamedRows = datafile.renameRows(rawData);
  //   const assignedRows = datafile.getAssignedRows(renamedRows);

  //   expect(assignedRows.length).to.equal(12271); // verified in excel (all rows)

  //   const stimuli = Stimuli.find(
  //     { studyId: datafile.studyId },
  //     { sort: { name: 1 } },
  //   ).fetch();

  //   expect(stimuli.length).to.equal(2); // 'Mapping 1' and 'smiGlasses'
  //   expect(stimuli[0].name).to.equal('Mapping 1');
  //   expect(stimuli[1].name).to.equal('smiGlasses');

  //   const aois = Aois.find({ studyId: datafile.studyId });
  //   expect(aois.count()).to.equal(2);

  //   expect(assignedRows[0].stimulusId).to.exist;
  //   expect(assignedRows[0].aoiId).to.exist;
  //   expect(assignedRows[assignedRows.length - 1].stimulusId).to.exist;
  //   expect(assignedRows[assignedRows.length - 1].aoiId).to.exist;
  // }).timeout(10000);

  it('assigns stimuli and aois to each row in a real smi file', async () => {
    const datafile = Factory.create('smiDatafile');
    datafile.fileFormat = 'smi';
    const rawData = await datafile.getRawData();
    expect(rawData.length).to.equal(12742);

    expect(rawData[0].stimulusId).to.be.undefined;
    expect(rawData[0].aoiId).to.be.undefined;
    expect(rawData[rawData.length - 1].stimulusId).to.be.undefined;
    expect(rawData[rawData.length - 1].aoiId).to.be.undefined;

    const timestampedData = datafile.mergeVideoStimulusRows(rawData);
    expect(timestampedData.length).to.equal(6981); // verified in Excel (all of the '.avi' rows)

    const renamedRows = datafile.renameRows(timestampedData);
    const assignedRows = datafile.getAssignedRows(renamedRows);

    expect(assignedRows.length).to.equal(6981); // verified in Excel (all of the '.avi' rows)

    const stimuli = Stimuli.find(
      { studyId: datafile.studyId },
      { sort: { name: 1 } },
    ).fetch();
    // expect(stimuli.length).to.equal(2); '-' and 'ImageA'
    expect(stimuli[0].name).to.equal('-');
    expect(stimuli[1].name).to.equal('ImageA');

    const aois0 = Aois.find({
      studyId: datafile.studyId,
      stimulusId: stimuli[0]._id,
    }).fetch();

    expect(aois0.length).to.equal(1);
    expect(aois0[0].name).to.equal('-');

    const aois1 = Aois.find(
      {
        studyId: datafile.studyId,
        stimulusId: stimuli[1]._id,
      },
      { sort: { name: 1 } },
    ).fetch();

    expect(aois1.length).to.equal(1);
    expect(aois1[0].name).to.equal('Image A');

    expect(assignedRows[0].stimulusId).to.exist;
    expect(assignedRows[0].aoiId).to.exist;
    expect(assignedRows[assignedRows.length - 1].stimulusId).to.exist;
    expect(assignedRows[assignedRows.length - 1].aoiId).to.exist;
  }).timeout(60000);

  // it('assigns stimuli and aois to each row in a real smi file with multiple stimuli', async () => {
  //   const datafile = Factory.create('smiMultiDatafile');
  //   datafile.fileFormat = 'smi';
  //   const rawData = await datafile.getRawData();

  //   expect(rawData[0].stimulusId).to.be.undefined;
  //   expect(rawData[0].aoiId).to.be.undefined;
  //   expect(rawData[rawData.length - 1].stimulusId).to.be.undefined;
  //   expect(rawData[rawData.length - 1].aoiId).to.be.undefined;

  //   const timestampedData = datafile.mergeVideoStimulusRows(rawData);
  //   const renamedRows = datafile.renameRows(timestampedData);
  //   const assignedRows = datafile.getAssignedRows(renamedRows);

  //   expect(assignedRows.length).to.equal(104429); // verified in Excel (all of the '.avi' rows)

  //   const stimuli = Stimuli.find({ studyId: datafile.studyId });
  //   expect(stimuli.count()).to.equal(11); // "Spool 1" through "Spool 10" and "-"

  //   const aois = Aois.find({ studyId: datafile.studyId });

  //   expect(aois.count()).to.equal(28); // verified in excel

  //   expect(assignedRows[0].stimulusId).to.exist;
  //   expect(assignedRows[0].aoiId).to.exist;
  //   expect(assignedRows[assignedRows.length - 1].stimulusId).to.exist;
  //   expect(assignedRows[assignedRows.length - 1].aoiId).to.exist;
  // }).timeout(10000);
});
