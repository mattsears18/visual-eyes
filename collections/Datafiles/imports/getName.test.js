require('./../../factories.test')
const expect = require('chai').expect

describe('Datafiles.getName()', () => {
  it('removes the file extension', async () => {
    let datafile = Factory.create('imotionsDatafile', { name: '018_aaron.txt' });
    expect(datafile.getName()).to.equal('018_aaron');
  });

  it('does nothing because there is no file extension', async () => {
    let datafile = Factory.create('imotionsDatafile', { name: '018_aaron' });
    expect(datafile.getName()).to.equal('018_aaron');
  });
});
