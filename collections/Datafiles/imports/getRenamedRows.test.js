require('./../../factories.test');
const { expect } = require('chai');

describe('Datafiles.getRenamedRows()', () => {
  it('returns empty array when passed empty array', async () => {
    const datafile = Factory.create('imotionsDatafile');
    const rows = [];
    expect(await datafile.getRenamedRows(rows)).to.eql(rows);
  });
});
