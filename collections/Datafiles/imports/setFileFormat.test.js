require('./../../factories.test');
const { expect } = require('chai');

if (Meteor.isServer) {
  describe('Datafiles.setFileFormat()', () => {
    it('sets the imotions fileFormat', async () => {
      const datafile = Factory.create('imotionsDatafile');
      const rawCsvData = await datafile.getRawCSV();
      expect(datafile.setFileFormat(rawCsvData)).to.equal('imotions');
    });

    it('sets the smi fileFormat', async () => {
      const datafile = Factory.create('smiDatafile');
      const rawCsvData = await datafile.getRawCSV();
      expect(datafile.setFileFormat(rawCsvData)).to.equal('smi');
    });

    it('is not a text file', async () => {
      const datafile = Factory.create('imotionsDatafile', {
        isText: false,
        fileFormat: undefined,
      });
      expect(datafile.setFileFormat()).to.be.an('undefined');
      expect(datafile.status).to.equal('unrecognizedFileFormat');
    });

    it('returns a previously saved fileFormat', async () => {
      const datafile = Factory.create('imotionsDatafile', {
        fileFormat: 'foo',
      });
      expect(datafile.fileFormat).to.equal('foo');
      expect(datafile.setFileFormat()).to.equal('foo');
    });

    it('has not already detected the filetype and does not provide rawCSVdata', () => {
      const datafile = Factory.create('imotionsDatafile');
      expect(() => {
        datafile.setFileFormat();
      }).to.throw('noRawCsvData');
    });
  });
}
