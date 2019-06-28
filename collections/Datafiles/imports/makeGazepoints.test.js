require('./../../factories.test');
const { expect } = require('chai');

if (Meteor.isServer) {
  describe('Datafiles.makeGazepoints()', () => {
    it('saves the fixation count even though study.fixationsOnly === false', async () => {
      const study = Factory.create('study', { fixationsOnly: false });
      const datafile = Factory.create('imotionsDatafile', { studyId: study._id });

      const points = await datafile.makeGazepoints({ saveStats: true });
      const dbDatafile = Datafiles.findOne({ _id: datafile._id });

      expect(dbDatafile.gazepointCount).to.exist;
      expect(dbDatafile.fixationCount).to.exist;
    }).timeout(60000);
  });
}
