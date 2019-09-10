import { Random } from 'meteor/random';
import Eyeevents from '../../Eyeevents/Eyeevents';
import Gazepoints from '../../Gazepoints/Gazepoints';

export default function makeEyeevents(renamedRows) {
  if (Meteor.isServer && !Meteor.isTest) console.log('Datafile.makeEyeevents()');

  const assignedRows = this.getAssignedRows(renamedRows);
  const groupedRows = this.groupRowsByStimulus(assignedRows);

  const bulkEvents = Eyeevents.rawCollection().initializeUnorderedBulkOp();
  const bulkGazepoints = Gazepoints.rawCollection().initializeUnorderedBulkOp();

  groupedRows.forEach((group) => {
    const {
      saccades, blinks, gazepoints, fixations,
    } = this.fileFormat === 'imotions'
      ? this.generateImotionsEyeevents(group.rows)
      : this.generateSMIEyeevents(group.rows);

    if (saccades.length) {
      saccades.forEach((event) => {
        bulkEvents.insert({
          ...event,
          _id: Random.id(),
          type: 'saccade',
          stimulusId: group.stimulusId,
          datafileId: this._id,
          studyId: this.studyId,
          participantId: this.participantId,
        });
      });
    }

    if (blinks.length) {
      blinks.forEach((event) => {
        bulkEvents.insert({
          ...event,
          _id: Random.id(),
          type: 'blink',
          stimulusId: group.stimulusId,
          datafileId: this._id,
          studyId: this.studyId,
          participantId: this.participantId,
        });
      });
    }

    if (fixations.length) {
      fixations.forEach((event) => {
        bulkEvents.insert({
          ...event,
          _id: Random.id(),
          type: 'fixation',
          stimulusId: group.stimulusId,
          datafileId: this._id,
          studyId: this.studyId,
          participantId: this.participantId,
        });
      });
    }

    if (gazepoints.length) {
      gazepoints.forEach((gazepoint) => {
        bulkGazepoints.insert({
          ...gazepoint,
          _id: Random.id(),
          fileFormat: this.fileFormat,
          stimulusId: group.stimulusId,
          datafileId: this._id,
          studyId: this.studyId,
          participantId: this.participantId,
        });
      });
    }
  });

  return {
    eyeeventsStatus: bulkEvents.execute(),
    gazepointsStatus: bulkGazepoints.execute(),
  };
}
