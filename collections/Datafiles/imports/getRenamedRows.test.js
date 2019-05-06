require('./../../factories.test');
const expect = require('chai').expect;

describe('Datafiles.getRenamedRows()', () => {
  it('returns empty array when passed empty array', async () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [];
    expect(await datafile.getRenamedRows(rows)).to.eql(rows);
  });
});
