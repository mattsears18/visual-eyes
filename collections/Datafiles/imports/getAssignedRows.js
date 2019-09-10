import helpers from '../../../lib/helpers';

export default function getAssignedRows(renamedRows) {
  if (Meteor.isServer && !Meteor.isTest) console.log('Datafiles.getAssignedRows()');

  if (!renamedRows || !renamedRows.length) {
    throw new Error('noData');
  }

  const rows = this.getStimuliOnly(renamedRows);

  const validCoordinateRows = this.getValidCoordinatesOnly(rows);

  // sort renamedRows by timestamp
  const sortedRows = this.filterSortFloat('timestamp', validCoordinateRows);

  const rowsWithStimuli = this.assignStimuli(sortedRows);
  const rowsWithAois = this.assignAois(rowsWithStimuli);

  return rowsWithAois;
}
