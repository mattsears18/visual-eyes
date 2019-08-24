const moment = require('moment');

export default function recomputeTimestamps(renamedRows) {
  console.log('recompute timestamps');
  const rows = [...renamedRows];

  // sort by timeOfDay (in place)
  rows.sort((a, b) => {
    let comparison = 0;
    if (a.timeOfDay > b.timeOfDay) {
      comparison = 1;
    } else if (a.timeOfDay < b.timeOfDay) {
      comparison = -1;
    }
    return comparison;
  });

  const initialMoment = getMoment(rows[0].timeOfDay);

  for (let i = 0; i < rows.length; i += 1) {
    rows[i].originalTimestamp = rows[i].timestamp;
    const currentMoment = getMoment(rows[i].timeOfDay);
    rows[i].timestamp = currentMoment - initialMoment;
  }

  return rows;
}

function getMoment(string) {
  return moment(string, 'hh:mm:ss:SSS');
}
