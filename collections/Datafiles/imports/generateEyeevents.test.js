import { Factory } from 'meteor/dburles:factory';

require('../../factories.test');
const { expect } = require('chai');

describe.only('Datafiles.generateEyeevents', () => {
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
  });

  it('generates eyeevents for a real smi file', async () => {
    const datafile = Factory.create('smiDatafile');
    datafile.fileFormat = 'smi';
    const rawCSVData = await datafile.getRawCSV();
    const assignedRows = datafile.getAssignedRows(rawCSVData);

    const {
      saccades,
      blinks,
      gazepoints,
      fixations,
    } = datafile.generateEyeevents(assignedRows);

    expect(saccades.length).to.equal(283); // verified in excel
    expect(blinks.length).to.equal(20); // verified in excel
    expect(gazepoints.length).to.equal(4239); // verified in excel
    expect(fixations.length).to.equal(305);
  });

  // it('generates eyeevents for a real smi file with multiple stimuli', async () => {
  //   const datafile = Factory.create('smiMultiDatafile');
  //   datafile.fileFormat = 'smi';
  //   const rawCSVData = await datafile.getRawCSV();
  //   const assignedRows = datafile.getAssignedRows(rawCSVData);

  //   const {
  //     saccades,
  //     blinks,
  //     gazepoints,
  //     fixations,
  //   } = datafile.generateEyeevents(assignedRows);

  //   expect(saccades.length).to.equal(1558); // verified in excel
  //   expect(blinks.length).to.equal(14); // verified in excel
  //   expect(gazepoints.length).to.equal(32332); // verified in excel
  //   expect(fixations.length).to.equal(0);
  // }).timeout(60000);
});
