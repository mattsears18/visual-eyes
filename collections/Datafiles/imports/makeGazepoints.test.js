require('./../../factories.test');

if(Meteor.isServer) {
  describe('Datafiles.makeGazepoints()', () => {
    it('saves the fixation count even though study.fixationsOnly == false', async () => {
      let study = Factory.create('study', { fixationsOnly: false });
      let datafile = Factory.create('imotionsDatafile', { studyId: study._id });

      let points = await datafile.makeGazepoints({ saveStats: true });
      let dbDatafile = Datafiles.findOne({ _id: datafile._id });

      chai.expect(dbDatafile.gazepointCount).to.exist;
      chai.expect(dbDatafile.fixationCount).to.exist;
    }).timeout(20000);
  });
}