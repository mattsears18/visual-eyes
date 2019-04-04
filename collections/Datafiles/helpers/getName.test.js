import StubCollections from 'meteor/hwillson:stub-collections';
import Datafiles from './../Datafiles';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
require('./../../factories');

describe('Datafiles.getName()', () => {
  beforeEach(() => {
    StubCollections.stub([Datafiles.collection, Studies]);
    resetDatabase();
  });
  afterEach(() => {
    StubCollections.restore();
  });

  it('removes the file extension', async () => {
    let datafile = Factory.create('smiDatafile', { name: '018_aaron.txt' });
    chai.expect(datafile.getName()).to.equal('018_aaron');
  });

  it('does nothing because there is no file extension', async () => {
    let datafile = Factory.create('smiDatafile', { name: '018_aaron' });
    chai.expect(datafile.getName()).to.equal('018_aaron');
  });
});
