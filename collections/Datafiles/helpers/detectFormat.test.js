import Datafiles from './../Datafiles';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
require('./../../factories');

if(Meteor.isServer) {
  describe('Datafiles.detectFormat()', () => {
    beforeEach(() => {
      resetDatabase();
    });

    it('detects and saves the imotions file format', async () => {
      let imotionsDatafile = Factory.create('imotionsDatafile');
      chai.expect(await imotionsDatafile.detectFormat()).to.equal('imotions');
      chai.expect(imotionsDatafile.fileFormat).to.equal('imotions');
    });

    it('detects and saves the smi file format', async () => {
      let smiDatafile = Factory.create('smiDatafile');
      chai.expect(await smiDatafile.detectFormat()).to.equal('smi');
      chai.expect(smiDatafile.fileFormat).to.equal('smi');
    });

    it('does not detect a fileFormat and saves status', async () => {
      let unrecognizedDatafile = Factory.create('unrecognizedDatafile');
      chai.expect(await unrecognizedDatafile.detectFormat()).to.be.an('undefined');
      chai.expect(unrecognizedDatafile.status).to.equal('unrecognizedFileFormat');
    });
  });
}
