import Eyeevents from '../../Eyeevents/Eyeevents';

export default async function makeEyeevents() {
  const rows = await this.getAssignedRows();

  const {
    saccades, blinks, gazepoints, fixations,
  } = this.generateEyeevents(
    rows,
  );

  return Eyeevents.find({ datafileId: this._id });
}
