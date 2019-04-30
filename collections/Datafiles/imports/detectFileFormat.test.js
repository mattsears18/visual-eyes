require('./../../factories.test')
const expect = require('chai').expect

if(Meteor.isServer) {
  describe('Datafiles.detectFileFormat()', () => {
    it('detects the imotions file format', async () => {
      let datafile = Factory.create('imotionsDatafile');
      expect(await datafile.detectFileFormat()).to.equal('imotions');
    });

    it('detects the smi file format', async () => {
      let datafile = Factory.create('smiDatafile');
      expect(await datafile.detectFileFormat()).to.equal('smi');
    });

    it('does not detect a fileFormat', async () => {
      let datafile = Factory.create('unrecognizedDatafile');
      expect(await datafile.detectFileFormat()).to.be.an('undefined');
    });
  });
}
