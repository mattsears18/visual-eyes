require('./../../factories.test');

if(Meteor.isServer) {
  describe('Datafiles.process()', () => {
    it('processes an SMI datafile', async () => {
      let study = Factory.create('study');
      let datafile = Factory.create('imotionsDatafile', { studyId: study._id });

      await datafile.process();

      chai.expect(datafile.headersRemoved).to.be.true;
      chai.expect(datafile.participantId).to.exist;
      chai.expect(datafile.fileFormat).to.exist;

      chai.expect(datafile.rawRowCount).to.exist;
      chai.expect(datafile.integerRowCount).to.exist;
      chai.expect(datafile.visualRowCount).to.exist;
      chai.expect(datafile.dupGazepointCount).to.exist;
      chai.expect(datafile.gazepointCount).to.exist;
      chai.expect(datafile.fixationCount).to.exist;

      chai.expect(datafile.status).to.equal('processed');

      let participant = Participants.findOne({ _id: datafile.participantId });

      chai.expect(participant.datafileIds).to.eql([datafile._id]);
    }).timeout(60000);

    it('creates one participant from two datafiles', async () => {
      let study = Factory.create('study');
      let datafile1 = Factory.create('imotionsDatafile', { studyId: study._id });
      await datafile1.process();

      let datafile2 = Factory.create('imotionsDatafile', { studyId: study._id, name: datafile1.name });
      await datafile2.process();

      let participant = Participants.findOne({ _id: datafile1.participantId });

      chai.expect(datafile1.participantId).to.equal(datafile2.participantId);
      chai.expect(participant.datafileIds).to.eql([datafile1._id, datafile2._id]);
    }).timeout(60000);
  });
}
