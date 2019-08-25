import Eyeevents from '../../Eyeevents/Eyeevents';

require('../../factories.test');
const { expect } = require('chai');

if (Meteor.isServer) {
  describe('Datafiles.makeEyeevents()', () => {
    it('does not make any eyeevents for imotions datafiles', () => {
      const datafile = Factory.create('imotionsDatafile');
      datafile.fileFormat = 'imotions';

      const newEyeevents = datafile.makeEyeevents();
      expect(newEyeevents.count()).to.equal(0);
    });

    it('makes eyeevents for a real smi datafile', async () => {
      const datafile = Factory.create('smiDatafile');
      datafile.fileFormat = 'smi';
      const rawCSVData = await datafile.getRawCSV();

      datafile.makeEyeevents(rawCSVData);

      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'saccade' }).count(),
      ).to.equal(283); // imotions report saccades
      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'blink' }).count(),
      ).to.equal(20); // imotions doesn't report blinks
      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'fixation' }).count(),
      ).to.equal(305);
    });
  });
}
