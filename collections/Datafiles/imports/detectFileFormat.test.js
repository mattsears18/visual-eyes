import { Factory } from 'meteor/dburles:factory';

require('./../../factories.test');
const { expect } = require('chai');

if (Meteor.isServer) {
  describe('Datafiles.detectFileFormat()', () => {
    it('does not supply the raw CSV data', () => {
      const datafile = Factory.create('imotionsDatafile');
      expect(() => {
        datafile.detectFileFormat();
      }).to.throw('noRawCSVData');
    });

    it('detects the imotions file format', async () => {
      const datafile = Factory.create('imotionsDatafile');
      const rawCsvData = await datafile.getRawCSV();
      expect(datafile.detectFileFormat(rawCsvData)).to.equal('imotions');
    });

    it('detects the smi file format', async () => {
      const datafile = Factory.create('smiDatafile');
      const rawCsvData = await datafile.getRawCSV();
      expect(datafile.detectFileFormat(rawCsvData)).to.equal('smi');
    });

    it('does not detect a fileFormat', async () => {
      const datafile = Factory.create('unrecognizedDatafile');
      const rawCsvData = await datafile.getRawCSV();
      expect(datafile.detectFileFormat(rawCsvData)).to.be.an('undefined');
    });
  });
}
