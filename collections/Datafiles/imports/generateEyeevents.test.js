import { Factory } from 'meteor/dburles:factory';

require('../../factories.test');
const { expect } = require('chai');

describe('Datafiles.generateEyeevents', () => {
  it("doesn't pass any data", () => {
    const datafile = Factory.create('imotionsDatafile');
    expect(() => {
      datafile.generateEyeevents();
    }).to.throw('noAssignedRows');
  });

  it('generates eyeevents for a real imotions file', async () => {
    const datafile = Factory.create('imotionsDatafile');
    datafile.fileFormat = 'imotions';
    const rawCSVData = await datafile.getRawCSV();
    const assignedRows = datafile.getAssignedRows(rawCSVData);

    const {
      saccades,
      blinks,
      gazepoints,
      fixations,
    } = datafile.generateEyeevents(assignedRows);

    expect(saccades.length).to.equal(0); // imotions report saccades
    expect(blinks.length).to.equal(0); // imotions doesn't report blinks
    expect(gazepoints.length).to.equal(5290); // verified in excel
    expect(fixations.length).to.equal(155); // verified in excel

    expect(fixations[3].index).to.equal(4); // verified in excel
    expect(fixations[3].timestamp).to.equal(10538); // verified in excel
    expect(fixations[3].duration).to.equal(216); // verified in excel
    expect(fixations[3].x).to.equal(202); // verified in excel
    expect(fixations[3].y).to.equal(188); // verified in excel

    expect(fixations[100].index).to.equal(101); // verified in excel
    expect(fixations[100].timestamp).to.equal(62282); // verified in excel
    expect(fixations[100].duration).to.equal(166); // verified in excel
    expect(fixations[100].x).to.equal(162); // verified in excel
    expect(fixations[100].y).to.equal(320); // verified in excel
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
    } = datafile.generateEyeevents(assignedRows);

    expect(saccades.length).to.equal(283); // verified in excel
    expect(blinks.length).to.equal(20); // verified in excel
    expect(gazepoints.length).to.equal(4239); // verified in excel
    expect(fixations.length).to.equal(305); // verified in excel

    expect(fixations[3].index).to.equal(15); // verified in excel
    expect(fixations[3].timestamp).to.equal(1908); // verified in excel
    expect(fixations[3].duration).to.equal(748); // verified in excel
    expect(fixations[3].x).to.equal(228); // verified in excel
    expect(fixations[3].y).to.equal(5); // verified in excel

    expect(fixations[300].index).to.equal(313); // verified in excel
    expect(fixations[300].timestamp).to.equal(93963); // verified in excel
    expect(fixations[300].duration).to.equal(315); // verified in excel
    expect(fixations[300].x).to.equal(297); // verified in excel
    expect(fixations[300].y).to.equal(202); // verified in excel
  });

  it.only('generates eyeevents for a real smi file with multiple stimuli', async () => {
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
    } = datafile.generateEyeevents(groupedRows[4].rows); // Spool 4

    console.log(fixations);

    console.log(`saccades:   ${saccades.length}`);
    console.log(`blinks:     ${blinks.length}`);
    console.log(`gazepoints: ${gazepoints.length}`);
    console.log(`fixations:  ${fixations.length}`);

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
    expect(fixations[3].index).to.equal(1090); // verified in excel
    expect(fixations[3].timestamp).to.equal(714); // verified in excel
    expect(fixations[3].duration).to.equal(99); // verified in excel
    expect(fixations[3].x).to.equal(1052); // verified in excel
    expect(fixations[3].y).to.equal(658); // verified in excel
  });
});
