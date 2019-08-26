import { Factory } from 'meteor/dburles:factory';

require('../../factories.test');
const { expect } = require('chai');

describe.only('Datafiles.generateSMIEyeevents', () => {
  it("doesn't pass any data", () => {
    const datafile = Factory.create('smiDatafile');
    expect(() => {
      datafile.generateSMIEyeevents();
    }).to.throw('noAssignedRows');
  });

  it('generates eyeevents for a real smi file', async () => {
    const datafile = Factory.create('smiDatafile');
    datafile.fileFormat = 'smi';
    const rawCSVData = await datafile.getRawCSV();
    const assignedRows = datafile.getAssignedRows(rawCSVData);

    // grouping by stimuli not necessary because there's only one stimulus in this file

    const {
      saccades,
      blinks,
      gazepoints,
      fixations,
    } = datafile.generateSMIEyeevents(assignedRows);

    expect(saccades.length).to.equal(283); // verified in excel
    expect(blinks.length).to.equal(20); // verified in excel
    expect(gazepoints.length).to.equal(4239); // verified in excel
    expect(fixations.length).to.equal(305); // verified in excel

    expect(fixations[3].index).to.equal(15); // verified in excel
    expect(fixations[3].timestamp).to.equal(1892); // verified in excel
    expect(fixations[3].duration).to.equal(780); // verified in excel
    expect(fixations[3].x).to.equal(228); // verified in excel
    expect(fixations[3].y).to.equal(5); // verified in excel
  });

  it('generates eyeevents for a real smi file with multiple stimuli', async () => {
    const datafile = Factory.create('smiMultiDatafile');
    datafile.fileFormat = 'smi';
    const rawCSVData = await datafile.getRawCSV();
    const assignedRows = datafile.getAssignedRows(rawCSVData);
    const groupedRows = datafile.groupRowsByStimulus(assignedRows);

    const {
      saccades,
      blinks,
      gazepoints,
      fixations,
    } = datafile.generateSMIEyeevents(groupedRows[4].rows); // Spool 4

    // console.log(fixations);

    // console.log(`saccades:   ${saccades.length}`);
    // console.log(`blinks:     ${blinks.length}`);
    // console.log(`gazepoints: ${gazepoints.length}`);
    // console.log(`fixations:  ${fixations.length}`);

    expect(saccades.length).to.equal(172); // verified in excel
    expect(blinks.length).to.equal(2); // verified in excel
    expect(gazepoints.length).to.equal(3256); // verified in excel
    expect(fixations.length).to.equal(198); // verified in excel

    expect(saccades[150].index).to.equal(151); // verified in excel
    expect(saccades[150].timestamp).to.equal(57220); // verified in excel
    expect(saccades[150].duration).to.equal(50); // verified in excel
    expect(saccades[150].x).to.equal(301); // verified in excel
    expect(saccades[150].y).to.equal(442); // verified in excel

    // fixation #3 (index === 1090) within Spool 4
    expect(fixations[100].index).to.equal(1889); // verified in excel
    expect(fixations[100].timestamp).to.equal(32875); // verified in excel
    expect(fixations[100].duration).to.equal(763); // verified in excel
    expect(fixations[100].x).to.equal(389); // verified in excel
    expect(fixations[100].y).to.equal(538); // verified in excel
  });
});
