import { Factory } from 'meteor/dburles:factory';

require('./../../factories.test');
const { expect } = require('chai');

if (Meteor.isServer) {
  describe('Datafiles.detectFileFormat()', () => {
    it('does not supply the raw CSV data', () => {
      const datafile = Factory.create('imotionsDatafile');
      expect(() => {
        datafile.detectFileFormat();
      }).to.throw('noRawData');
    });

    it('detects the imotions file format', async () => {
      const datafile = Factory.create('imotionsDatafile');
      const rawData = await datafile.getRawData();
      expect(datafile.detectFileFormat(rawData)).to.equal('imotions');
    });

    it('detects the smi file format', async () => {
      const datafile = Factory.create('smiDatafile');
      const rawData = await datafile.getRawData();
      expect(datafile.detectFileFormat(rawData)).to.equal('smi');
    });

    it('does not detect a fileFormat', async () => {
      const datafile = Factory.create('unrecognizedDatafile');
      const rawData = await datafile.getRawData();
      expect(datafile.detectFileFormat(rawData)).to.be.an('undefined');
    });
  });
}
