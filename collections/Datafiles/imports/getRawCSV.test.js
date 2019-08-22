import { Factory } from 'meteor/dburles:factory';

require('./../../factories.test');
const { expect } = require('chai');

if (Meteor.isServer) {
  describe('Datafiles.getRawCSV()', () => {
    it('has 12,271 rows of raw data', async () => {
      const imotionsDatafile = Factory.create('imotionsDatafile');
      expect((await imotionsDatafile.getRawCSV()).length).to.equal(12271);
    });

    it('has 12,742 rows of raw data', async () => {
      const smiDatafile = Factory.create('smiDatafile');
      expect((await smiDatafile.getRawCSV()).length).to.equal(12742);
    });

    it('has 146,558 rows of raw data', async () => {
      const smiPipeDatafile = Factory.create('smiPipeDatafile');
      expect((await smiPipeDatafile.getRawCSV()).length).to.equal(146558);
    });
  });
}
