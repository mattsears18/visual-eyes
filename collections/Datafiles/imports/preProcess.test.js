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

  it('preProcesses a file', async () => {
    const datafile = Factory.create('imotionsDatafile');

    expect(datafile.status).to.equal('needsProcessing');

    datafile.preProcess();
    expect(datafile.status).to.equal('processing');
  });
});
