require('./../../factories.test');

if(Meteor.isServer) {
  describe('Datafiles.makeGazepoints()', () => {
    it('makes fixations only', async () => {
      let study = Factory.create('study', { fixationsOnly: true });
      let datafile = Factory.create('imotionsDatafile', { studyId: study._id });
      await datafile.makeGazepoints();
    }).timeout(20000);

    it('makes all gazepoints', async () => {
      let study = Factory.create('study', { fixationsOnly: false });
      let datafile = Factory.create('imotionsDatafile', { studyId: study._id });
      await datafile.makeGazepoints();
    }).timeout(20000);
  });
}
