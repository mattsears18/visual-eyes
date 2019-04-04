import Datafiles from './../Datafiles';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
require('./../../factories');

if(Meteor.isServer) {
  describe('Datafiles.detectFileFormat()', () => {
    beforeEach(() => {
      resetDatabase();
    });

    it('detects the imotions file format', async () => {
      let datafile = Factory.create('imotionsDatafile');
      chai.expect(await datafile.detectFileFormat()).to.equal('imotions');
    });

    it('detects the smi file format', async () => {
      let datafile = Factory.create('smiDatafile');
      chai.expect(await datafile.detectFileFormat()).to.equal('smi');
    });

    it('does not detect a fileFormat', async () => {
      let datafile = Factory.create('unrecognizedDatafile');
      chai.expect(await datafile.detectFileFormat()).to.be.an('undefined');
    });
  });
}
