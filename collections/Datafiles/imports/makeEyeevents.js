import Eyeevents from '../../Eyeevents/Eyeevents';

export default function makeEyeevents(rawCSVData) {
  if (this.fileFormat !== 'imotions') {
    const assignedRows = this.getAssignedRows(rawCSVData);

    const groupedRows = this.groupRowsByStimulus(assignedRows);

    groupedRows.forEach((group) => {
      console.log(group.rows);
      // const {
      //   saccades,
      //   blinks,
      //   gazepoints,
      //   fixations,
      // } = this.generateSMIEyeevents(assignedRows);
    });
  }

  return Eyeevents.find({ datafileId: this._id });
}
