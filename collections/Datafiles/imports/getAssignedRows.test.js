import { Factory } from 'meteor/dburles:factory';

require('../../factories.test');
const { expect } = require('chai');

describe('Datafiles.getAssignedRows()', () => {
  it("doesn't pass any rawCsvData", () => {
    const datafile = Factory.create('imotionsDatafile');
    expect(() => {
      datafile.getAssignedRows();
    }).to.throw('noRawCsvData');
  });

  it('assigns stimuli and aois to each row in a real imotions file', async () => {
    const datafile = Factory.create('imotionsDatafile');
    datafile.fileFormat = 'imotions';
    const rawCsvData = await datafile.getRawCSV();

    expect(rawCsvData[0].stimulusId).to.be.undefined;
    expect(rawCsvData[0].aoiId).to.be.undefined;
    expect(rawCsvData[rawCsvData.length - 1].stimulusId).to.be.undefined;
    expect(rawCsvData[rawCsvData.length - 1].aoiId).to.be.undefined;

    const assignedRows = datafile.getAssignedRows(rawCsvData);

    expect(assignedRows.length).to.equal(3218); // verified in excel

    const stimuli = Stimuli.find({ studyId: datafile.studyId });
    expect(stimuli.count()).to.equal(1);

    const aois = Aois.find({ studyId: datafile.studyId });
    expect(aois.count()).to.equal(1);

    expect(assignedRows[0].stimulusId).to.exist;
    expect(assignedRows[0].aoiId).to.exist;
    expect(assignedRows[assignedRows.length - 1].stimulusId).to.exist;
    expect(assignedRows[assignedRows.length - 1].aoiId).to.exist;
  });

  it('assigns stimuli and aois to each row in a real smi file', async () => {
    const datafile = Factory.create('smiDatafile');
    datafile.fileFormat = 'smi';
    const rawCsvData = await datafile.getRawCSV();

    expect(rawCsvData[0].stimulusId).to.be.undefined;
    expect(rawCsvData[0].aoiId).to.be.undefined;
    expect(rawCsvData[rawCsvData.length - 1].stimulusId).to.be.undefined;
    expect(rawCsvData[rawCsvData.length - 1].aoiId).to.be.undefined;

    const assignedRows = datafile.getAssignedRows(rawCsvData);

    expect(assignedRows.length).to.equal(4326); // verified in excel

    const stimuli = Stimuli.find({ studyId: datafile.studyId });
    expect(stimuli.count()).to.equal(1);

    const aois = Aois.find({ studyId: datafile.studyId });

    expect(aois.count()).to.equal(2); // '-' and 'ImageA' verified in excel

    expect(assignedRows[0].stimulusId).to.exist;
    expect(assignedRows[0].aoiId).to.exist;
    expect(assignedRows[assignedRows.length - 1].stimulusId).to.exist;
    expect(assignedRows[assignedRows.length - 1].aoiId).to.exist;
  });

  it('assigns stimuli and aois to each row in a real smi file with multiple stimuli', async () => {
    const datafile = Factory.create('smiMultiDatafile');
    datafile.fileFormat = 'smi';
    const rawCsvData = await datafile.getRawCSV();

    expect(rawCsvData[0].stimulusId).to.be.undefined;
    expect(rawCsvData[0].aoiId).to.be.undefined;
    expect(rawCsvData[rawCsvData.length - 1].stimulusId).to.be.undefined;
    expect(rawCsvData[rawCsvData.length - 1].aoiId).to.be.undefined;

    const assignedRows = datafile.getAssignedRows(rawCsvData);

    expect(assignedRows.length).to.equal(41897); // verified in excel

    const stimuli = Stimuli.find({ studyId: datafile.studyId });
    expect(stimuli.count()).to.equal(10); // "Spool 1" through "Spool 10"

    const aois = Aois.find({ studyId: datafile.studyId });

    expect(aois.count()).to.equal(28); // verified in excel

    expect(assignedRows[0].stimulusId).to.exist;
    expect(assignedRows[0].aoiId).to.exist;
    expect(assignedRows[assignedRows.length - 1].stimulusId).to.exist;
    expect(assignedRows[assignedRows.length - 1].aoiId).to.exist;
  });
});
