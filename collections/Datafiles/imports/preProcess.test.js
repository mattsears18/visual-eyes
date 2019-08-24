import { Factory } from 'meteor/dburles:factory';

require('../../factories.test');
const { expect } = require('chai');

describe('Datafiles.preProcess()', () => {
  it("doesn't have a study", async () => {
    const datafile = Factory.create('imotionsDatafile', {
      studyId: 'iGotAFakeIdDoe'
    });

    expect(() => {
      datafile.preProcess();
    }).to.throw('noStudy');
  });
  it("doesn't provide the rawCSVData", async () => {
    const datafile = Factory.create('imotionsDatafile');

    expect(() => {
      datafile.preProcess();
    }).to.throw('noRawCSVData');
  });

  it('preProcesses a file', async () => {
    const datafile = Factory.create('imotionsDatafile');
    expect(datafile.status).to.equal('needsProcessing');
    const rawCsvData = await datafile.getRawCSV();
    datafile.preProcess(rawCsvData);
    expect(datafile.status).to.equal('processing');
  });
});
