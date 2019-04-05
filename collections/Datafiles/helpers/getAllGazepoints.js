require('../../../lib/helpers');

export default async function getAllGazepoints(data) {
  if(!data) { data = await this.getRenamedRows() }

  let rawRows = await this.getNumericPositiveCoordinatesOnly(data);
  this.rawRowCount = rawRows.length;

  let visualRows = rawRows;
  if(helpers.keyInArray('category', rawRows)) {
    visualRows = await this.getVisualIntakesOnly(rawRows);
  }

  let dupGazepoints = visualRows;
  if(helpers.keyInArray('stimulusName', visualRows)) {
    dupGazepoints = await this.getStimuliOnly(visualRows);
  }
  this.dupGazepointCount = dupGazepoints.length;

  let allGazepoints = this.getNonDuplicateCoordinatesOnly(dupGazepoints);
  this.gazepointCount = allGazepoints.length;

  // if(saveStats) {
  //   console.log(helpers.formatNumber(rawRows.length) + ' raw rows');
  //
  //   if(helpers.keyInArray('category', rawRows)) {
  //     console.log(helpers.formatNumber(visualRows.length) + ' visual intake rows');
  //   } else {
  //     console.log('no visual intakes, so no need to filter');
  //   }
  //
  //   if(helpers.keyInArray('stimulusName', visualRows)) {
  //     console.log(helpers.formatNumber(dupGazepoints.length) + ' gazepoints (with duplicates)');
  //   } else {
  //     console.log('no stimuli, so no need to filter');
  //   }
  //
  //   Datafiles.update({ _id: this._id}, { $set: {
  //     rawRowCount: this.rawRowCount,
  //     dupGazepointCount: dupGazepoints.length,
  //     gazepointCount: gazepoints.length,
  //   }});
  // }

  return allGazepoints;
}
