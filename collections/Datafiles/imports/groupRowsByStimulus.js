export default function groupRowsByStimulus(assignedRows) {
  if (!Meteor.isTest) console.log('Datafile.groupRowsByStimulus()');

  if (!assignedRows || !assignedRows.length) {
    throw Error('noAssignedRows');
  }

  const rows = [...assignedRows];
  const stimulusIds = new Set(rows.map(map => map.stimulusId));

  const groups = [];

  stimulusIds.forEach((stimulusId) => {
    const stimulusRows = this.filterSortFloat(
      'timestamp',
      rows.filter(row => row.stimulusId === stimulusId),
    );
    const { stimulusName } = stimulusRows[0];
    const group = { stimulusId, stimulusName, rows: stimulusRows };
    groups.push(group);
  });

  // sort by stimulusName
  groups.sort((a, b) => {
    if (a.stimulusName < b.stimulusName) {
      return -1;
    }
    if (a.stimulusName > b.stimulusName) {
      return 1;
    }
    return 0;
  });

  return groups;
}
