require('../../../lib/helpers');
fs = require('fs');
const { parse } = require('json2csv');

export default async function getGazepoints({
  data = null,
  saveStats = false,
}) {
  if (!data) {
    data = await this.getRenamedRows();
  }

  // console.log(data);

  this.rawRowCount = parseInt(data.length, 10);

  const integerRows = await this.getNumericPositiveCoordinatesOnly(data);
  this.integerRowCount = parseInt(integerRows.length, 10);

  let visualRows = integerRows;
  if (helpers.keyInArray('category', integerRows)) {
    visualRows = await this.getVisualIntakesOnly(integerRows);
  }
  this.visualRowCount = parseInt(visualRows.length, 10);

  let dupGazepoints = visualRows;
  if (helpers.keyInArray('stimulusName', visualRows)) {
    dupGazepoints = await this.getStimuliOnly(visualRows);
  }
  this.dupGazepointCount = parseInt(dupGazepoints.length, 10);

  const allGazepoints = this.getNonDuplicateCoordinatesOnly(dupGazepoints);
  this.gazepointCount = parseInt(allGazepoints.length, 10);

  if (saveStats) {
    Datafiles.update(
      { _id: this._id },
      {
        $set: {
          rawRowCount: this.rawRowCount,
          integerRowCount: this.integerRowCount,
          visualRowCount: this.visualRowCount,
          dupGazepointCount: this.dupGazepointCount,
          gazepointCount: this.gazepointCount,
        },
      },
    );
  }

  return dupGazepoints;
}
