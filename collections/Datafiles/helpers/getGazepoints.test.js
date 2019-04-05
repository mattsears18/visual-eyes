require('./../../factories.test');

if(Meteor.isServer) {
  describe('Datafiles.getGazepoints()', () => {
    it('gets fixations', async () => {
      let study = Factory.create('study', { fixationsOnly: true });
      let datafile = Factory.create('imotionsDatafile', { studyId: study._id });
      chai.expect(await datafile.getGazepoints()).to.eql(await datafile.getFixations());
    });

    it('gets gazepoints', async () => {
      let study = Factory.create('study', { fixationsOnly: false });
      let datafile = Factory.create('imotionsDatafile', { studyId: study._id });
      chai.expect(await datafile.getGazepoints()).to.eql(await datafile.getAllGazepoints());
    });
  });
}
