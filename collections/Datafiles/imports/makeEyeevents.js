import Eyeevents from '../../Eyeevents/Eyeevents';

export default async function makeEyeevents(rawCSVData) {
  const assignedRows = this.getAssignedRows(rawCSVData);

  const { saccades, blinks, gazepoints, fixations } = this.generateEyeevents(
    assignedRows
  );

  return Eyeevents.find({ datafileId: this._id });
}
