require('./../../factories.test');

describe('Datafiles.getRenamedRows()', () => {
  it('returns empty array when passed empty array', async () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [];
    chai.expect(await datafile.getRenamedRows(rows)).to.eql(rows);
  });
});
