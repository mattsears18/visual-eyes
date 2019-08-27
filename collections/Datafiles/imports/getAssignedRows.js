import helpers from '../../../lib/helpers';

export default function getAssignedRows(rawCsvData) {
  let renamedRows = this.getRenamedRows(rawCsvData);

  this.rawRowCount = renamedRows.length;

  Datafiles.update(
    { _id: this._id },
    { $set: { rawRowCount: this.rawRowCount } },
  );

  renamedRows = this.getStimuliOnly(renamedRows);

  const validCoordinateRows = this.getValidCoordinatesOnly(renamedRows);

  // sort renamedRows by timestamp
  const sortedRows = this.filterSortFloat('timestamp', validCoordinateRows);

  const rowsWithStimuli = this.assignStimuli(sortedRows);
  const rowsWithAois = this.assignAois(rowsWithStimuli);

  return rowsWithAois;
}
