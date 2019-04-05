require('./../../factories.test');

describe('Datafiles.getRenamedRows()', () => {
  it('returns empty array when passed empty array', async () => {
    let datafile = Factory.create('smiDatafile');
    let rows = [];
    chai.expect(await datafile.getRenamedRows(rows)).to.eql(rows);
  });
});
