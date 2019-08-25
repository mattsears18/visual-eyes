import Eyeevents from '../../Eyeevents/Eyeevents';

export default function makeEyeevents(rawCSVData) {
  if (this.fileFormat !== 'imotions') {
    const assignedRows = this.getAssignedRows(rawCSVData);

    const groupedRows = this.groupRowsByStimulus(assignedRows);

    // for each stimulus... generateEyeevents...

    // const {
    //   saccades, blinks, gazepoints, fixations,
    // } = this.generateEyeevents(
    //   assignedRows,
    // );
  }

  return Eyeevents.find({ datafileId: this._id });
}
