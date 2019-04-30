require('./../../factories.test')
const expect = require('chai').expect

if(Meteor.isServer) {
  describe('Datafiles.setFileFormat()', () => {
    it('sets the imotions fileFormat', async () => {
      let datafile = Factory.create('imotionsDatafile');
      expect(await datafile.setFileFormat()).to.equal('imotions');
      expect(datafile.fileFormat).to.equal('imotions');
    });

    it('sets the smi fileFormat', async () => {
      let datafile = Factory.create('smiDatafile');
      expect(await datafile.setFileFormat()).to.equal('smi');
      expect(datafile.fileFormat).to.equal('smi');
    });

    it('is not a text file', async () => {
      let datafile = Factory.create('imotionsDatafile', { isText: false, fileFormat: undefined });
      expect(await datafile.setFileFormat()).to.be.an('undefined');
      expect(datafile.status).to.equal('unrecognizedFileFormat');
    });

    it('returns a previously saved fileFormat', async () => {
      let datafile = Factory.create('imotionsDatafile', { fileFormat: 'foo' });
      expect(await datafile.fileFormat).to.equal('foo');
      expect(await datafile.setFileFormat()).to.equal('foo');
    });
  });
}
