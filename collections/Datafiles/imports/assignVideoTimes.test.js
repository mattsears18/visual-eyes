import { Factory } from 'meteor/dburles:factory';

const { expect } = require('chai');

describe('Datafiles.assignVideoTimes()', () => {
  it("doesn't provide the rawCsvData", async () => {
    const datafile = Factory.create('imotionsDatafile');

    expect(() => {
      datafile.assignVideoTimes();
    }).to.throw('noRawCsvData');
  });

  it('gets the video times when all indices match', async () => {
    const datafile = Factory.create('smiDatafile');
    const rawCsvData = await datafile.getRawCSV();
    datafile.preProcess(rawCsvData);

    const hrstart = process.hrtime();
    const rawCsvDataWithVideoTimes = datafile.assignVideoTimes(rawCsvData);
    const hrend = process.hrtime(hrstart);

    console.info(
      'Time to assign video times (hr): %ds %dms',
      hrend[0],
      hrend[1] / 1000000,
    );
  });
});
