import { Factory } from 'meteor/dburles:factory';

require('../../factories.test');
const { expect } = require('chai');

describe('Datafiles.preProcess()', () => {
  it("doesn't have a study", async () => {
    const datafile = Factory.create('imotionsDatafile', {
      studyId: 'iGotAFakeIdDoe',
    });

    expect(() => {
      datafile.preProcess();
    }).to.throw('noStudy');
  });
  it("doesn't provide the rawData", async () => {
    const datafile = Factory.create('imotionsDatafile');

    // error thrown from Datafile.detectFileFormat()
    expect(() => {
      datafile.preProcess();
    }).to.throw('noRawData');
  });

  it('preProcesses a file', async () => {
    const datafile = Factory.create('imotionsDatafile');

    expect(datafile.status).to.equal('needsProcessing');
    const rawData = await datafile.getRawData();
    datafile.preProcess(rawData);
    expect(datafile.status).to.equal('processing');
  });
});
