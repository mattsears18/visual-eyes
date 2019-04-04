export default async function getGazepoints() {
  let rows
  try {
    rows = await this.getRenamedRows();
  }
  catch (err) {
    console.log(err);
  }

  let rawRows = this.getNumericPositiveCoordinatesOnly(rows);
  console.log(helpers.formatNumber(rawRows.length) + ' raw rows');
  if(!this.rawRowCount) {
    this.rawRowCount = rawRows.length;
    Datafiles.update({ _id: this._id}, { $set: { rawRowCount: this.rawRowCount }});
  }

  let visualRows = this.getVisualIntakesOnly(rawRows);
  console.log(helpers.formatNumber(visualRows.length) + ' visual intake rows');

  let dupGazepoints = this.getStimuliOnly(visualRows);
  console.log(helpers.formatNumber(dupGazepoints.length) + ' gazepoints (with duplicates)');
  if(!this.dupGazepointCount) {
    this.dupGazepointCount = dupGazepoints.length;
    Datafiles.update({ _id: this._id }, { $set: { dupGazepointCount: dupGazepoints.length }});
  }

  let gazepoints = this.getNonDuplicateCoordinatesOnly(dupGazepoints);
  console.log(helpers.formatNumber(gazepoints.length) + ' gazepoints');
  if(!this.gazepointCount) {
    this.gazepointCount = gazepoints.length;
    Datafiles.update({ _id: this._id }, { $set: { gazepointCount: gazepoints.length }});
  }

  return gazepoints;
}
