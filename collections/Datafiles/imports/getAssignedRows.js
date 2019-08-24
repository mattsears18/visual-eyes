import helpers from '../../../lib/helpers';

export default async function getAssignedRows(rawCsvData) {
  let rows = [...(await this.getRenamedRows())];
  this.rawRowCount = rows.length;

  Datafiles.update(
    { _id: this._id },
    { $set: { rawRowCount: this.rawRowCount } }
  );

  rows = this.getStimuliOnly(rows);
  this.stimulusRowCount = rows.length;

  Datafiles.update(
    { _id: this._id },
    { $set: { stimulusRowCount: this.stimulusRowCount } }
  );

  // recompute timestamps from timeOfDay (required for SMI files)
  if (helpers.keyInArray('timeOfDay', rows)) {
    rows = this.recomputeTimestamps(rows);
  }

  // sort rows by timestamp
  rows = this.filterSortFloat('timestamp', rows);

  rows = this.assignStimuli(rows);
  rows = this.assignAois(rows);

  return rows;
}
