import { Factory } from 'meteor/dburles:factory';

require('../../factories.test');
const { expect } = require('chai');

describe('Datafiles.groupRowsByStimulus()', () => {
  it('groups by imotions stimuli (single stimulus)', async () => {
    const datafile = Factory.create('imotionsDatafile');
    datafile.fileFormat = 'imotions';
    const rawCsvData = await datafile.getRawCSV();
    const assignedRows = datafile.getAssignedRows(rawCsvData);
    const groupedByStimulus = datafile.groupRowsByStimulus(assignedRows);

    expect(groupedByStimulus.length).to.equal(1);
    expect(groupedByStimulus[0].stimulusName).to.equal('Mapping 1');
    expect(groupedByStimulus[0].rows.length).to.equal(5290); // verified in excel
  });

  it('groups by smi stimuli (multiple stimuli)', async () => {
    const datafile = Factory.create('smiMultiDatafile');
    datafile.fileFormat = 'smi';
    const rawCsvData = await datafile.getRawCSV();
    const assignedRows = datafile.getAssignedRows(rawCsvData);
    const groupedByStimulus = datafile.groupRowsByStimulus(assignedRows);

    expect(groupedByStimulus.length).to.equal(10);

    expect(groupedByStimulus[0].stimulusName).to.equal('Spool 1');
    expect(groupedByStimulus[0].rows.length).to.equal(3662); // verified in excel

    expect(groupedByStimulus[1].stimulusName).to.equal('Spool 10');
    expect(groupedByStimulus[1].rows.length).to.equal(1155); // verified in excel

    expect(groupedByStimulus[2].stimulusName).to.equal('Spool 2');
    expect(groupedByStimulus[2].rows.length).to.equal(6585); // verified in excel

    expect(groupedByStimulus[3].stimulusName).to.equal('Spool 3');
    expect(groupedByStimulus[3].rows.length).to.equal(5873); // verified in excel

    expect(groupedByStimulus[4].stimulusName).to.equal('Spool 4');
    expect(groupedByStimulus[4].rows.length).to.equal(4003); // verified in excel

    expect(groupedByStimulus[5].stimulusName).to.equal('Spool 5');
    expect(groupedByStimulus[5].rows.length).to.equal(2859); // verified in excel

    expect(groupedByStimulus[6].stimulusName).to.equal('Spool 6');
    expect(groupedByStimulus[6].rows.length).to.equal(1559); // verified in excel

    expect(groupedByStimulus[7].stimulusName).to.equal('Spool 7');
    expect(groupedByStimulus[7].rows.length).to.equal(5617); // verified in excel

    expect(groupedByStimulus[8].stimulusName).to.equal('Spool 8');
    expect(groupedByStimulus[8].rows.length).to.equal(5292); // verified in excel

    expect(groupedByStimulus[9].stimulusName).to.equal('Spool 9');
    expect(groupedByStimulus[9].rows.length).to.equal(5524); // verified in excel
  });
});
