import { Factory } from 'meteor/dburles:factory';
import Eyeevents from '../../Eyeevents/Eyeevents';

require('../../factories.test');
const { expect } = require('chai');

if (Meteor.isServer) {
  describe.only('Datafiles.makeEyeevents()', () => {
    it('does not make any eyeevents for imotions datafiles', async () => {
      const participant = Factory.create('participant');
      const datafile = Factory.create('imotionsDatafile', {
        studyId: participant.studyId,
        participantId: participant._id,
      });
      datafile.fileFormat = 'imotions';
      const rawCsvData = await datafile.getRawCSV();
      const bulkStatus = await datafile.makeEyeevents(rawCsvData);

      expect(bulkStatus.nInserted).to.equal(155);

      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'saccade' }).count(),
      ).to.equal(0); // imotions report saccades
      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'blink' }).count(),
      ).to.equal(0); // imotions doesn't report blinks
      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'fixation' }).count(),
      ).to.equal(155);
    }).timeout(10000);

    it('makes eyeevents for a real smi datafile', async () => {
      const participant = Factory.create('participant');
      const datafile = Factory.create('smiDatafile', {
        studyId: participant.studyId,
        participantId: participant._id,
      });

      datafile.fileFormat = 'smi';
      const rawCsvData = await datafile.getRawCSV();
      const bulkStatus = await datafile.makeEyeevents(rawCsvData);

      expect(bulkStatus.nInserted).to.equal(608);

      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'saccade' }).count(),
      ).to.equal(283); // imotions report saccades
      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'blink' }).count(),
      ).to.equal(20); // imotions doesn't report blinks
      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'fixation' }).count(),
      ).to.equal(305);
    }).timeout(10000);

    it('makes eyeevents for a real smi datafile with multiple stimuli', async () => {
      const participant = Factory.create('participant');
      const datafile = Factory.create('smiMultiDatafile', {
        studyId: participant.studyId,
        participantId: participant._id,
      });

      datafile.fileFormat = 'smi';
      const rawCsvData = await datafile.getRawCSV();
      const bulkStatus = await datafile.makeEyeevents(rawCsvData);

      expect(bulkStatus.nInserted).to.equal(3395);

      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'saccade' }).count(),
      ).to.equal(1558); // imotions report saccades
      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'blink' }).count(),
      ).to.equal(14); // imotions doesn't report blinks
      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'fixation' }).count(),
      ).to.equal(1823);
    }).timeout(10000);
  });
}
