import { Factory } from 'meteor/dburles:factory';
import Eyeevents from '../../Eyeevents/Eyeevents';

require('../../factories.test');
const { expect } = require('chai');

if (Meteor.isServer) {
  describe('Datafiles.makeEyeevents()', () => {
    it('makes gazepoints and fixations imotions datafiles', async () => {
      const participant = Factory.create('participant');
      const datafile = Factory.create('imotionsDatafile', {
        studyId: participant.studyId,
        participantId: participant._id,
      });
      datafile.fileFormat = 'imotions';
      const rawCsvData = await datafile.getRawCSV();
      const statuses = datafile.makeEyeevents(rawCsvData);
      const eyeeventsStatus = await statuses.eyeeventsStatus;
      const gazepointsStatus = await statuses.gazepointsStatus;

      expect(eyeeventsStatus.nInserted).to.equal(155);
      expect(gazepointsStatus.nInserted).to.equal(5290);

      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'saccade' }).count(),
      ).to.equal(0); // imotions report saccades
      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'blink' }).count(),
      ).to.equal(0); // imotions doesn't report blinks
      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'fixation' }).count(),
      ).to.equal(155);
      expect(Gazepoints.find({ datafileId: datafile._id }).count()).to.equal(
        5290,
      );
    });

    it('makes eyeevents for a real smi datafile', async () => {
      const participant = Factory.create('participant');
      const datafile = Factory.create('smiDatafile', {
        studyId: participant.studyId,
        participantId: participant._id,
      });
      datafile.fileFormat = 'smi';
      const rawCsvData = await datafile.getRawCSV();
      const statuses = datafile.makeEyeevents(rawCsvData);
      const eyeeventsStatus = await statuses.eyeeventsStatus;
      const gazepointsStatus = await statuses.gazepointsStatus;

      expect(eyeeventsStatus.nInserted).to.equal(608);
      expect(gazepointsStatus.nInserted).to.equal(4239);

      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'saccade' }).count(),
      ).to.equal(283); // imotions report saccades
      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'blink' }).count(),
      ).to.equal(20); // imotions doesn't report blinks
      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'fixation' }).count(),
      ).to.equal(305);
      expect(Gazepoints.find({ datafileId: datafile._id }).count()).to.equal(
        4239,
      );
    });

    it('makes eyeevents for a real smi datafile with multiple stimuli', async () => {
      const participant = Factory.create('participant');
      const datafile = Factory.create('smiMultiDatafile', {
        studyId: participant.studyId,
        participantId: participant._id,
      });
      datafile.fileFormat = 'smi';
      const rawCsvData = await datafile.getRawCSV();
      const statuses = datafile.makeEyeevents(rawCsvData);
      const eyeeventsStatus = await statuses.eyeeventsStatus;
      const gazepointsStatus = await statuses.gazepointsStatus;

      expect(eyeeventsStatus.nInserted).to.equal(3395);
      expect(gazepointsStatus.nInserted).to.equal(32332);

      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'saccade' }).count(),
      ).to.equal(1558); // imotions report saccades
      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'blink' }).count(),
      ).to.equal(14); // imotions doesn't report blinks
      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'fixation' }).count(),
      ).to.equal(1823);
      expect(Gazepoints.find({ datafileId: datafile._id }).count()).to.equal(
        32332,
      );
    }).timeout(10000);
  });
}
