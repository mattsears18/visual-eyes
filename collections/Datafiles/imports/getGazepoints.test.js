require('./../../factories.test');
const { expect } = require('chai');

if (Meteor.isServer) {
  describe('Datafiles.getGazepoints()', () => {
    it('gets fixations', async () => {
      const study = Factory.create('study', { fixationsOnly: true });
      const datafile = Factory.create('imotionsDatafile', { studyId: study._id });
      expect(await datafile.getGazepoints({})).to.eql(await datafile.getFixations({}));
    });

    it('gets gazepoints', async () => {
      const study = Factory.create('study', { fixationsOnly: false });
      const datafile = Factory.create('imotionsDatafile', { studyId: study._id });
      expect(await datafile.getGazepoints({})).to.eql(await datafile.getAllGazepoints({}));
    });
  });
}
