require('./../../factories.test');

if(Meteor.isServer) {
  describe('Datafiles.makeGazepoints()', () => {
    it('makes fixations only', () => {
      let study = Factory.create('study', { fixationsOnly: true });
      let datafile = Factory.create('imotionsDatafile', { studyId: study._id });
      datafile.makeGazepoints();
    });

    it('makes all gazepoints', () => {
      let study = Factory.create('study', { fixationsOnly: false });
      let datafile = Factory.create('imotionsDatafile', { studyId: study._id });
      datafile.makeGazepoints();
    });
  });
}
