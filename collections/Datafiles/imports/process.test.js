import { Factory } from 'meteor/dburles:factory';
import Gazepoints from '../../Gazepoints/Gazepoints';

require('../../factories.test');
const { expect } = require('chai');

if (Meteor.isServer) {
  describe.only('Datafiles.process()', () => {
    it('processes an SMI datafile with multiple AOIs (pipe spool task)', async () => {
      const study = Factory.create('study');
      const datafile = Factory.create('smiPipeDatafile', {
        studyId: study._id,
      });

      await datafile.process();

      expect(datafile.rawRowCount).to.equal(146558);
      expect(datafile.stimulusRowCount).to.equal(42129);
      expect(datafile.integerRowCount).to.equal(41897);
      expect(datafile.gazepointCount).to.equal(32231);

      expect(datafile.headersRemoved).to.be.true;
      expect(datafile.participantId).to.exist;
      expect(datafile.fileFormat).to.equal('smi');

      expect(datafile.status).to.equal('processed');

      const participant = Participants.findOne({ _id: datafile.participantId });

      expect(participant.datafileIds).to.eql([datafile._id]);

      const gazepoints = Gazepoints.find({ datafileId: datafile._id });

      expect(gazepoints.count()).to.equal(32231);
    }).timeout(120000);

    // it('processes an iMotions datafile', async () => {
    //   const study = Factory.create('study');
    //   const datafile = Factory.create('imotionsDatafile', {
    //     studyId: study._id,
    //   });

    //   await datafile.process();

    //   expect(datafile.headersRemoved).to.be.true;
    //   expect(datafile.participantId).to.exist;
    //   expect(datafile.fileFormat).to.exist;

    //   expect(datafile.rawRowCount).to.exist;
    //   expect(datafile.integerRowCount).to.exist;
    //   expect(datafile.gazepointCount).to.exist;

    //   expect(datafile.status).to.equal('processed');

    //   const participant = Participants.findOne({ _id: datafile.participantId });

    //   expect(participant.datafileIds).to.eql([datafile._id]);
    // }).timeout(60000);

    // it('creates one participant from two datafiles', async () => {
    //   const study = Factory.create('study');
    //   const datafile1 = Factory.create('imotionsDatafile', {
    //     studyId: study._id,
    //   });
    //   await datafile1.process();

    //   const datafile2 = Factory.create('imotionsDatafile', {
    //     studyId: study._id,
    //     name: datafile1.name,
    //   });
    //   await datafile2.process();

    //   const participant = Participants.findOne({
    //     _id: datafile1.participantId,
    //   });

    //   expect(datafile1.participantId).to.equal(datafile2.participantId);
    //   expect(participant.datafileIds).to.eql([datafile1._id, datafile2._id]);
    // }).timeout(60000);
  });
}
