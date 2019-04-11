require('./../../factories.test');

describe('Datafiles.getName()', () => {
  it('removes the file extension', async () => {
    let datafile = Factory.create('imotionsDatafile', { name: '018_aaron.txt' });
    chai.expect(datafile.getName()).to.equal('018_aaron');
  });

  it('does nothing because there is no file extension', async () => {
    let datafile = Factory.create('imotionsDatafile', { name: '018_aaron' });
    chai.expect(datafile.getName()).to.equal('018_aaron');
  });
});
