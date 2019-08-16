export default async function getFixations({ data = null, saveStats = false }) {
  if (!data) {
    data = await this.getAllGazepoints({ saveStats });
  }

  const goodRows = [];
  const indices = [];

  data.forEach((row) => {
    if (Number.isInteger(parseInt(row.fixationIndex, 10))) {
      const ref = `${row.fixationIndex}, ${row.stimulusId}`;
      if (!indices.includes(ref)) {
        indices.push(ref);
        goodRows.push(row);
      }
    }
  });

  this.fixationCount = goodRows.length;

  if (saveStats) {
    Datafiles.update(
      { _id: this._id },
      { $set: { fixationCount: this.fixationCount } },
    );
  }

  return goodRows;
}
