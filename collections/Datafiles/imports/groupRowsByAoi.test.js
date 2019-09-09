import { Factory } from 'meteor/dburles:factory';

require('../../factories.test');
const { expect } = require('chai');

describe('Datafiles.groupRowsByAoi()', () => {
  it('groups by imotions aois (single aoi)', async () => {
    const datafile = Factory.create('imotionsDatafile');
    datafile.fileFormat = 'imotions';
    const rawData = await datafile.getRawData();
    const assignedRows = datafile.getAssignedRows(rawData);
    const groupedByAoi = datafile.groupRowsByAoi(assignedRows);

    expect(groupedByAoi.length).to.equal(1);
    expect(groupedByAoi[0].aoiName).to.equal('-');
    expect(groupedByAoi[0].rows.length).to.equal(3218); // verified in excel
  });

  it('groups by smi aois (multiple aois)', async () => {
    const datafile = Factory.create('smiMultiDatafile');
    datafile.fileFormat = 'smi';
    const rawData = await datafile.getRawData();
    const assignedRows = datafile.getAssignedRows(rawData);
    const groupedByAoi = datafile.groupRowsByAoi(assignedRows);

    // console.log(groupedByAoi);

    expect(groupedByAoi.length).to.equal(28);

    expect(groupedByAoi[0].aoiName).to.equal('-');
    expect(groupedByAoi[0].stimulusName).to.equal('Spool 7');
    expect(groupedByAoi[0].rows.length).to.equal(730); // verified in excelxc

    expect(groupedByAoi[1].aoiName).to.equal('-');
    expect(groupedByAoi[1].stimulusName).to.equal('Spool 10');
    expect(groupedByAoi[1].rows.length).to.equal(147); // verified in excel

    expect(groupedByAoi[2].aoiName).to.equal('-');
    expect(groupedByAoi[2].stimulusName).to.equal('Spool 6');
    expect(groupedByAoi[2].rows.length).to.equal(216); // verified in excel

    expect(groupedByAoi[3].aoiName).to.equal('-');
    expect(groupedByAoi[3].stimulusName).to.equal('Spool 3');
    expect(groupedByAoi[3].rows.length).to.equal(712); // verified in excel

    expect(groupedByAoi[4].aoiName).to.equal('-');
    expect(groupedByAoi[4].stimulusName).to.equal('Spool 4');
    expect(groupedByAoi[4].rows.length).to.equal(533); // verified in excel

    expect(groupedByAoi[5].aoiName).to.equal('-');
    expect(groupedByAoi[5].stimulusName).to.equal('Spool 1');
    expect(groupedByAoi[5].rows.length).to.equal(442); // verified in excel

    expect(groupedByAoi[6].aoiName).to.equal('-');
    expect(groupedByAoi[6].stimulusName).to.equal('Spool 5');
    expect(groupedByAoi[6].rows.length).to.equal(357); // verified in excel

    expect(groupedByAoi[7].aoiName).to.equal('-');
    expect(groupedByAoi[7].stimulusName).to.equal('Spool 9');
    expect(groupedByAoi[7].rows.length).to.equal(779); // verified in excel

    expect(groupedByAoi[8].aoiName).to.equal('-');
    expect(groupedByAoi[8].stimulusName).to.equal('Spool 8');
    expect(groupedByAoi[8].rows.length).to.equal(761); // verified in excel

    expect(groupedByAoi[9].aoiName).to.equal('-');
    expect(groupedByAoi[9].stimulusName).to.equal('Spool 2');
    expect(groupedByAoi[9].rows.length).to.equal(836); // verified in excel

    expect(groupedByAoi[10].aoiName).to.equal('Spool 1');
    expect(groupedByAoi[10].stimulusName).to.equal('Spool 1');
    expect(groupedByAoi[10].rows.length).to.equal(3213); // verified in excel

    expect(groupedByAoi[11].aoiName).to.equal('Spool 10');
    expect(groupedByAoi[11].stimulusName).to.equal('Spool 10');
    expect(groupedByAoi[11].rows.length).to.equal(972); // verified in excel

    expect(groupedByAoi[12].aoiName).to.equal('Spool 2');
    expect(groupedByAoi[12].stimulusName).to.equal('Spool 2');
    expect(groupedByAoi[12].rows.length).to.equal(5705); // verified in excel

    expect(groupedByAoi[13].aoiName).to.equal('Spool 3');
    expect(groupedByAoi[13].stimulusName).to.equal('Spool 3');
    expect(groupedByAoi[13].rows.length).to.equal(5115); // verified in excel

    expect(groupedByAoi[14].aoiName).to.equal('Spool 4');
    expect(groupedByAoi[14].stimulusName).to.equal('Spool 4');
    expect(groupedByAoi[14].rows.length).to.equal(3449); // verified in excel

    expect(groupedByAoi[15].aoiName).to.equal('Spool 5');
    expect(groupedByAoi[15].stimulusName).to.equal('Spool 5');
    expect(groupedByAoi[15].rows.length).to.equal(2454); // verified in excel

    expect(groupedByAoi[16].aoiName).to.equal('Spool 6');
    expect(groupedByAoi[16].stimulusName).to.equal('Spool 6');
    expect(groupedByAoi[16].rows.length).to.equal(1272); // verified in excel

    expect(groupedByAoi[17].aoiName).to.equal('Spool 7');
    expect(groupedByAoi[17].stimulusName).to.equal('Spool 7');
    expect(groupedByAoi[17].rows.length).to.equal(4836); // verified in excel

    expect(groupedByAoi[18].aoiName).to.equal('Spool 8');
    expect(groupedByAoi[18].stimulusName).to.equal('Spool 8');
    expect(groupedByAoi[18].rows.length).to.equal(4417); // verified in excel

    expect(groupedByAoi[19].aoiName).to.equal('Spool 9');
    expect(groupedByAoi[19].stimulusName).to.equal('Spool 9');
    expect(groupedByAoi[19].rows.length).to.equal(2436); // verified in excel

    expect(groupedByAoi[20].aoiName).to.equal('White Space');
    expect(groupedByAoi[20].stimulusName).to.equal('Spool 3');
    expect(groupedByAoi[20].rows.length).to.equal(29); // verified in excel

    expect(groupedByAoi[21].aoiName).to.equal('White Space');
    expect(groupedByAoi[21].stimulusName).to.equal('Spool 4');
    expect(groupedByAoi[21].rows.length).to.equal(20); // verified in excel

    expect(groupedByAoi[22].aoiName).to.equal('White Space');
    expect(groupedByAoi[22].stimulusName).to.equal('Spool 5');
    expect(groupedByAoi[22].rows.length).to.equal(47); // verified in excel

    expect(groupedByAoi[23].aoiName).to.equal('White Space');
    expect(groupedByAoi[23].stimulusName).to.equal('Spool 10');
    expect(groupedByAoi[23].rows.length).to.equal(11); // verified in excel

    expect(groupedByAoi[24].aoiName).to.equal('White Space');
    expect(groupedByAoi[24].stimulusName).to.equal('Spool 6');
    expect(groupedByAoi[24].rows.length).to.equal(11); // verified in excel

    expect(groupedByAoi[25].aoiName).to.equal('White Space');
    expect(groupedByAoi[25].stimulusName).to.equal('Spool 9');
    expect(groupedByAoi[25].rows.length).to.equal(2308); // verified in excel

    expect(groupedByAoi[26].aoiName).to.equal('White Space');
    expect(groupedByAoi[26].stimulusName).to.equal('Spool 7');
    expect(groupedByAoi[26].rows.length).to.equal(44); // verified in excel

    expect(groupedByAoi[27].aoiName).to.equal('White Space');
    expect(groupedByAoi[27].stimulusName).to.equal('Spool 8');
    expect(groupedByAoi[27].rows.length).to.equal(45); // verified in excel
  });
});
