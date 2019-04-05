require('./../../factories.test');

if(Meteor.isServer) {
  describe('Datafiles.makeGazepoints()', () => {
    it('makes ____ imotions gazepoints', async () => {
      let study = Factory.create('study', { fixationsOnly: false });
      let datafile = Factory.create('imotionsDatafile', { studyId: study._id });
      let gazepoints = await datafile.makeGazepoints();
      chai.expect(gazepoints.count()).to.equal(1000);
    }).timeout(20000);

    it('makes ____ imotions fixations', async () => {
      let study = Factory.create('study', { fixationsOnly: true });
      let datafile = Factory.create('imotionsDatafile', { studyId: study._id });
      let gazepoints = await datafile.makeGazepoints();
      chai.expect(gazepoints.count()).to.equal(1000);
    }).timeout(20000);
  });
}
