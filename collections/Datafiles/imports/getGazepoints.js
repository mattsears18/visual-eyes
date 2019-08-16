import helpers from '../../../lib/helpers';

fs = require('fs');
const { parse } = require('json2csv');

export default async function getGazepoints({
  data = null,
  saveStats = false,
}) {
  if (!data) {
    data = await this.getRenamedRows();
  }

  this.rawRowCount = parseInt(data.length, 10);

  const integerRows = await this.getNumericPositiveCoordinatesOnly(data);
  this.integerRowCount = parseInt(integerRows.length, 10);

  let visualRows = integerRows;
  if (helpers.keyInArray('category', integerRows)) {
    visualRows = await this.getVisualIntakesOnly(integerRows);
  }
  this.visualRowCount = parseInt(visualRows.length, 10);

  let allGazepoints = visualRows;
  if (helpers.keyInArray('stimulusName', visualRows)) {
    allGazepoints = await this.getStimuliOnly(visualRows);
  }
  this.gazepointCount = parseInt(allGazepoints.length, 10);

  if (saveStats) {
    Datafiles.update(
      { _id: this._id },
      {
        $set: {
          rawRowCount: this.rawRowCount,
          integerRowCount: this.integerRowCount,
          visualRowCount: this.visualRowCount,
          gazepointCount: this.gazepointCount,
        },
      },
    );
  }

  return allGazepoints;
}
