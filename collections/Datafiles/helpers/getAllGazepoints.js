require('../../../lib/helpers');
fs = require('fs');
const { parse } = require('json2csv');

export default async function getAllGazepoints({
  data = null,
  saveStats = false,
}) {
  if(!data) { data = await this.getRenamedRows() }

  this.rawRowCount = parseInt(data.length);

  let integerRows = await this.getNumericPositiveCoordinatesOnly(data);
  this.integerRowCount = parseInt(integerRows.length);

  if(this.integerRowCount > 10288) {
    let myData = integerRows.map((row, ri) => { return { i: ri, t: row.timestamp }});
    fs.writeFile(process.env['PWD'] + '/meh.csv', parse(myData), function(err) {
      if(err) {
        return console.log(err);
      }
    });
  }

  let visualRows = integerRows;
  if(helpers.keyInArray('category', integerRows)) {
    visualRows = await this.getVisualIntakesOnly(integerRows);
  }
  this.visualRowCount = parseInt(visualRows.length);

  let dupGazepoints = visualRows;
  if(helpers.keyInArray('stimulusName', visualRows)) {
    dupGazepoints = await this.getStimuliOnly(visualRows);
  }
  this.dupGazepointCount = parseInt(dupGazepoints.length);

  let allGazepoints = this.getNonDuplicateCoordinatesOnly(dupGazepoints);
  this.gazepointCount = parseInt(allGazepoints.length);

  if(saveStats) {
    Datafiles.update({ _id: this._id }, { $set: {
      rawRowCount:        this.rawRowCount,
      integerRowCount:    this.integerRowCount,
      visualRowCount:     this.visualRowCount,
      dupGazepointCount:  this.dupGazepointCount,
      gazepointCount:     this.gazepointCount,
    }});
  }

  return allGazepoints;
}
