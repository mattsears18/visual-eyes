export default function getAssignedRows(renamedRows) {
  if (Meteor.isServer && !Meteor.isTest) console.log('Datafiles.getAssignedRows()');

  if (!renamedRows || !renamedRows.length) {
    throw new Error('noData');
  }

  const rowsWithStimuli = this.assignStimuli([...renamedRows]);
  const rowsWithAois = this.assignAois(rowsWithStimuli);

  return rowsWithAois;
}
