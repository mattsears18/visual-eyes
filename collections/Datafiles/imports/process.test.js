import { Factory } from 'meteor/dburles:factory';

require('../../factories.test');
const { expect } = require('chai');

if (Meteor.isServer) {
  describe('Datafiles.process()', () => {
    it('processes an SMI datafile', async () => {
      const study = Factory.create('study');
      const datafile = Factory.create('imotionsDatafile', {
        studyId: study._id,
      });

      await datafile.process();

      expect(datafile.headersRemoved).to.be.true;
      expect(datafile.participantId).to.exist;
      expect(datafile.fileFormat).to.exist;

      expect(datafile.rawRowCount).to.exist;
      expect(datafile.integerRowCount).to.exist;
      expect(datafile.gazepointCount).to.exist;

      expect(datafile.status).to.equal('processed');

      const participant = Participants.findOne({ _id: datafile.participantId });

      expect(participant.datafileIds).to.eql([datafile._id]);
    }).timeout(60000);

    it('creates one participant from two datafiles', async () => {
      const study = Factory.create('study');
      const datafile1 = Factory.create('imotionsDatafile', {
        studyId: study._id,
      });
      await datafile1.process();

      const datafile2 = Factory.create('imotionsDatafile', {
        studyId: study._id,
        name: datafile1.name,
      });
      await datafile2.process();

      const participant = Participants.findOne({
        _id: datafile1.participantId,
      });

      expect(datafile1.participantId).to.equal(datafile2.participantId);
      expect(participant.datafileIds).to.eql([datafile1._id, datafile2._id]);
    }).timeout(60000);
  });
}
