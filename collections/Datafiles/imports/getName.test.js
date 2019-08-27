import { Factory } from 'meteor/dburles:factory';

require('./../../factories.test');
const { expect } = require('chai');

describe('Datafiles.getName()', () => {
  it('removes the file extension', async () => {
    const datafile = Factory.create('imotionsDatafile', {
      name: '018_aaron.txt',
    });
    expect(datafile.getName()).to.equal('018_aaron');
  });

  it('does nothing because there is no file extension', async () => {
    const datafile = Factory.create('imotionsDatafile', { name: '018_aaron' });
    expect(datafile.getName()).to.equal('018_aaron');
  });
});
