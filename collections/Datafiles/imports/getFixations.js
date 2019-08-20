export default async function getFixations(opts) {
  const _data = (opts && opts.data) ? [...opts.data] : await this.getGazepoints();

  const goodRows = [];
  const indices = [];

  _data.forEach((row) => {
    if (Number.isInteger(parseInt(row.fixationIndex, 10))) {
      const ref = `${row.fixationIndex}, ${row.stimulusId}`;
      if (!indices.includes(ref)) {
        indices.push(ref);
        goodRows.push(row);
      }
    }
  });

  this.fixationCount = goodRows.length;

  Datafiles.update(
    { _id: this._id },
    { $set: { fixationCount: this.fixationCount } },
  );

  return goodRows;
}
