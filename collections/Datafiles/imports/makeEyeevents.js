import Eyeevents from '../../Eyeevents/Eyeevents';

export default function makeEyeevents(rawCSVData) {
  console.log('Datafile.makeEyeevents()');

  const assignedRows = this.getAssignedRows(rawCSVData);
  const groupedRows = this.groupRowsByStimulus(assignedRows);

  const newEyeevents = [];

  groupedRows.forEach((group) => {
    const {
      saccades, blinks, gazepoints, fixations,
    } = this.fileFormat === 'imotions'
      ? this.generateImotionsEyeevents(group.rows)
      : this.generateSMIEyeevents(group.rows);

    if (saccades.length) {
      saccades.forEach((event) => {
        newEyeevents.push({
          ...event,
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
        newEyeevents.push({
          ...event,
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
        newEyeevents.push({
          ...event,
          type: 'fixation',
          stimulusId: group.stimulusId,
          datafileId: this._id,
          studyId: this.studyId,
          participantId: this.participantId,
        });
      });
    }
  });

  const bulk = Eyeevents.rawCollection().initializeUnorderedBulkOp();

  newEyeevents.forEach((event) => {
    bulk.insert(event);
  });

  return bulk.execute();
}
