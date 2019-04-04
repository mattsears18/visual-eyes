import StubCollections from 'meteor/hwillson:stub-collections';
import Datafiles from './../Datafiles';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
require('./../../factories');

if(Meteor.isServer) {
  describe('Datafiles.getRawCSV()', () => {
    beforeEach(() => {
      StubCollections.stub([Datafiles.collection, Studies]);
      resetDatabase();
    });
    afterEach(() => {
      StubCollections.restore();
    });

    it('has 12,271 rows of raw data', async () => {
      let imotionsDatafile = Factory.create('imotionsDatafile');
      chai.expect((await imotionsDatafile.getRawCSV()).length).to.equal(12271);
    });

    it('has 12,742 rows of raw data', async () => {
      let smiDatafile = Factory.create('smiDatafile');
      chai.expect((await smiDatafile.getRawCSV()).length).to.equal(12742);
    });
  });
}
