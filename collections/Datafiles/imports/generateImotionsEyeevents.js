export default function generateImotionsEyeevents(assignedRows) {
  if (Meteor.isServer && !Meteor.isTest) console.log('Datafiles.generateImotionsEyeevents()');

  // assume rows have already been sorted by timestamp
  // assume all rows belong to same stimulus

  if (!assignedRows || !assignedRows.length) {
    throw Error('noAssignedRows');
  }

  const rows = [...assignedRows];

  const saccades = [];
  const blinks = [];
  const gazepoints = [];
  const fixations = [];

  let lastFixation = null;

  for (let i = 0; i < rows.length; i += 1) {
    gazepoints.push(rows[i]);

    if (rows[i].eventIndex) {
      if (!lastFixation || lastFixation.eventIndex !== rows[i].eventIndex) {
        lastFixation = {
          timestamp: rows[i].timestamp,
          eventIndex: rows[i].eventIndex,
          x: rows[i].fixationX,
          y: rows[i].fixationY,
          aoiId: rows[i].aoiId,
        };

        fixations.push(lastFixation);
      }
    }
  }

  return {
    saccades,
    blinks,
    gazepoints,
    fixations,
  };
}
