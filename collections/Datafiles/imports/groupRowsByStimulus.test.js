import { Factory } from 'meteor/dburles:factory';

require('../../factories.test');
const { expect } = require('chai');

describe('Datafiles.groupRowsByStimulus()', () => {
  it('groups by imotions stimuli (single stimulus)', async () => {
    const datafile = Factory.create('imotionsDatafile');
    datafile.fileFormat = 'imotions';
    const rawData = await datafile.getRawData();
    const assignedRows = datafile.getAssignedRows(rawData);
    const groupedByStimulus = datafile.groupRowsByStimulus(assignedRows);

    expect(groupedByStimulus.length).to.equal(1);
    expect(groupedByStimulus[0].stimulusName).to.equal('Mapping 1');
    expect(groupedByStimulus[0].rows.length).to.equal(3218); // verified in excel
  });

  it('groups by smi stimuli (multiple stimuli)', async () => {
    const datafile = Factory.create('smiMultiDatafile');
    datafile.fileFormat = 'smi';
    const rawData = await datafile.getRawData();
    const assignedRows = datafile.getAssignedRows(rawData);
    const groupedByStimulus = datafile.groupRowsByStimulus(assignedRows);

    expect(groupedByStimulus.length).to.equal(10);

    expect(groupedByStimulus[0].stimulusName).to.equal('Spool 1');
    expect(groupedByStimulus[0].rows.length).to.equal(3655); // verified in excelxc

    expect(groupedByStimulus[1].stimulusName).to.equal('Spool 10');
    expect(groupedByStimulus[1].rows.length).to.equal(1130); // verified in excel

    expect(groupedByStimulus[2].stimulusName).to.equal('Spool 2');
    expect(groupedByStimulus[2].rows.length).to.equal(6541); // verified in excel

    expect(groupedByStimulus[3].stimulusName).to.equal('Spool 3');
    expect(groupedByStimulus[3].rows.length).to.equal(5856); // verified in excel

    expect(groupedByStimulus[4].stimulusName).to.equal('Spool 4');
    expect(groupedByStimulus[4].rows.length).to.equal(4002); // verified in excel

    expect(groupedByStimulus[5].stimulusName).to.equal('Spool 5');
    expect(groupedByStimulus[5].rows.length).to.equal(2858); // verified in excel

    expect(groupedByStimulus[6].stimulusName).to.equal('Spool 6');
    expect(groupedByStimulus[6].rows.length).to.equal(1499); // verified in excel

    expect(groupedByStimulus[7].stimulusName).to.equal('Spool 7');
    expect(groupedByStimulus[7].rows.length).to.equal(5610); // verified in excel

    expect(groupedByStimulus[8].stimulusName).to.equal('Spool 8');
    expect(groupedByStimulus[8].rows.length).to.equal(5223); // verified in excel

    expect(groupedByStimulus[9].stimulusName).to.equal('Spool 9');
    expect(groupedByStimulus[9].rows.length).to.equal(5523); // verified in excel
  });
});
