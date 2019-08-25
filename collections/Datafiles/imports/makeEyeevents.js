import Eyeevents from '../../Eyeevents/Eyeevents';

export default function makeEyeevents(rawCSVData) {
  if (this.fileFormat !== 'imotions') {
    const assignedRows = this.getAssignedRows(rawCSVData);

    const {
      saccades, blinks, gazepoints, fixations,
    } = this.generateEyeevents(
      assignedRows,
    );
  }

  return Eyeevents.find({ datafileId: this._id });
}
