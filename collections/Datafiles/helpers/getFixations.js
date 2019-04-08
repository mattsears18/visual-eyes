export default async function getFixations({
  data = null,
  saveStats = false,
}) {
  if(!data) { data = await this.getAllGazepoints({ saveStats: saveStats }) }

  let goodRows = [];
  let indices = [];

  data.forEach((row) => {
    if(Number.isInteger(parseInt(row.fixationIndex))){
      let ref = row.fixationIndex + ', ' + row.stimulusName;
      if(!indices.includes(ref)) {
        indices.push(ref);
        goodRows.push(row);
      }
    }
  });

  this.fixationCount = goodRows.length;

  if(saveStats) {
    Datafiles.update({ _id: this._id }, { $set: { fixationCount: this.fixationCount }});
  }

  return goodRows;
}
