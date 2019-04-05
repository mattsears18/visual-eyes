require('../../../lib/helpers');

export default async function getAllGazepoints({
  data = null,
  saveStats = false,
}) {
  if(!data) { data = await this.getRenamedRows() }

  let rawRows = await this.getNumericPositiveCoordinatesOnly(data);
  this.rawRowCount = parseInt(rawRows.length);

  let visualRows = rawRows;
  if(helpers.keyInArray('category', rawRows)) {
    visualRows = await this.getVisualIntakesOnly(rawRows);
    this.visualRowCount = parseInt(visualRows.length);
  }

  let dupGazepoints = visualRows;
  if(helpers.keyInArray('stimulusName', visualRows)) {
    dupGazepoints = await this.getStimuliOnly(visualRows);
  }
  this.dupGazepointCount = parseInt(dupGazepoints.length);

  let allGazepoints = this.getNonDuplicateCoordinatesOnly(dupGazepoints);
  this.gazepointCount = parseInt(allGazepoints.length);

  if(saveStats) {
    console.log(helpers.formatNumber(this.rawRowCount) + ' raw rows');

    if(helpers.keyInArray('category', rawRows)) {
      console.log(helpers.formatNumber(this.visualRowCount) + ' visual intake rows');
    } else {
      console.log('no visual intakes, so no need to filter');
    }

    if(helpers.keyInArray('stimulusName', visualRows)) {
      console.log(helpers.formatNumber(this.dupGazepointCount) + ' gazepoints (with duplicates)');
    } else {
      console.log('no stimuli, so no need to filter');
    }

    console.log(helpers.formatNumber(this.gazepointCount) + ' unique gazepoints');

    Datafiles.update({ _id: this._id}, { $set: {
      rawRowCount: this.rawRowCount,
      dupGazepointCount: this.dupGazepointCount,
      gazepointCount: this.gazepointCount,
    }});
  }

  return allGazepoints;
}
