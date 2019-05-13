require('./../../factories.test');
const { expect } = require('chai');

if (Meteor.isServer) {
  describe('Datafiles.detectFileFormat()', () => {
    it('detects the imotions file format', async () => {
      const datafile = Factory.create('imotionsDatafile');
      expect(await datafile.detectFileFormat()).to.equal('imotions');
    });

    it('detects the smi file format', async () => {
      const datafile = Factory.create('smiDatafile');
      expect(await datafile.detectFileFormat()).to.equal('smi');
    });

    it('does not detect a fileFormat', async () => {
      const datafile = Factory.create('unrecognizedDatafile');
      expect(await datafile.detectFileFormat()).to.be.an('undefined');
    });
  });
}
