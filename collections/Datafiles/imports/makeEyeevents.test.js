import Eyeevents from '../../Eyeevents/Eyeevents';

require('../../factories.test');
const { expect } = require('chai');

if (Meteor.isServer) {
  describe('Datafiles.makeEyeevents()', () => {
    it('does not make any eyeevents for imotions datafiles', async () => {
      const datafile = Factory.create('imotionsDatafile');
      datafile.fileFormat = 'imotions';
      const rawCsvData = await datafile.getRawCSV();

      const newEyeevents = datafile.makeEyeevents(rawCsvData);
      expect(newEyeevents.count()).to.equal(155);

      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'saccade' }).count(),
      ).to.equal(0); // imotions report saccades
      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'blink' }).count(),
      ).to.equal(0); // imotions doesn't report blinks
      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'fixation' }).count(),
      ).to.equal(155);
    });

    it('makes eyeevents for a real smi datafile', async () => {
      const datafile = Factory.create('smiDatafile');
      datafile.fileFormat = 'smi';
      const rawCsvData = await datafile.getRawCSV();

      const newEyeevents = datafile.makeEyeevents(rawCsvData);
      expect(newEyeevents.count()).to.equal(608);

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
