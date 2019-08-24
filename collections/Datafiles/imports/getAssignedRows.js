import helpers from '../../../lib/helpers';

export default function getAssignedRows(rawCsvData) {
  let renamedRows = this.getRenamedRows(rawCsvData);

  this.rawRowCount = renamedRows.length;

  Datafiles.update(
    { _id: this._id },
    { $set: { rawRowCount: this.rawRowCount } },
  );

  renamedRows = this.getStimuliOnly(renamedRows);
  this.stimulusRowCount = renamedRows.length;

  Datafiles.update(
    { _id: this._id },
    { $set: { stimulusRowCount: this.stimulusRowCount } },
  );

  // recompute timestamps from timeOfDay (required for SMI files)
  if (helpers.keyInArray('timeOfDay', renamedRows)) {
    renamedRows = this.recomputeTimestamps(renamedRows);
  }

  // sort renamedRows by timestamp
  const sortedRows = this.filterSortFloat('timestamp', renamedRows);

  const rowsWithStimuli = this.assignStimuli(sortedRows);
  const rowsWithAois = this.assignAois(rowsWithStimuli);

  return rowsWithAois;
}
