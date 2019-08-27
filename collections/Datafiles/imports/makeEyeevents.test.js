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
      expect(gazepointsStatus.nInserted).to.equal(3218);

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
        3218,
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

      expect(eyeeventsStatus.nInserted).to.equal(408);
      expect(gazepointsStatus.nInserted).to.equal(2948);

      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'saccade' }).count(),
      ).to.equal(190); // imotions report saccades
      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'blink' }).count(),
      ).to.equal(13); // imotions doesn't report blinks
      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'fixation' }).count(),
      ).to.equal(205);
      expect(Gazepoints.find({ datafileId: datafile._id }).count()).to.equal(
        2948,
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

      expect(eyeeventsStatus.nInserted).to.equal(3378);
      expect(gazepointsStatus.nInserted).to.equal(32231);

      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'saccade' }).count(),
      ).to.equal(1551); // imotions report saccades
      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'blink' }).count(),
      ).to.equal(14); // imotions doesn't report blinks
      expect(
        Eyeevents.find({ datafileId: datafile._id, type: 'fixation' }).count(),
      ).to.equal(1813);
      expect(Gazepoints.find({ datafileId: datafile._id }).count()).to.equal(
        32231,
      );
    }).timeout(10000);
  });
}
