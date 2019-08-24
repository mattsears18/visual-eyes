export default function generateEyeevents(inputRows) {
  // assume rows have already been sorted by timestamp
  // assume all rows have a stimulusId
  const rows = inputRows ? [...inputRows] : this.getAssignedRows();

  return rows;

  const saccades = [];
  const blinks = [];
  const gazepoints = [];
  const fixations = [];

  let lastEvent = '';
  const lastAoiId = '';
  const lastStimulusId = '';

  // TODO pick back up here 2019-08-23

  for (let i = 0; i < rows.length; i += 1) {
    if (!rows[i].stimulusId) {
      // console.log(rows[i].stimulusId);
    }

    switch (rows[i].category) {
      case 'Visual Intake':
        gazepoints.push(rows[i]);
        lastEvent = 'visualIntake';
        break;
      case 'Saccade':
        console.log('Saccade!');
        lastEvent = 'saccade';
        break;
      case 'Blink':
        lastEvent = 'blink';
        break;
      case 'User Event':
        break;
      case '-':
        break;

      default:
        console.log('invalid recorded row category');
    }

    // console.log(lastEvent);
  }

  // _data.forEach((r) => {
  //   const row = Object.assign({}, r);
  //   row.datafileId = this._id;
  //   row.fileFormat = this.fileFormat;
  //   row.studyId = this.studyId;

  //   row.aoiName = row.aoiName || '-';

  //   row.stimulusId = helpers.findOrInsert('stimuli', {
  //     name: row.stimulusName,
  //     studyId: this.studyId,
  //   });

  // if (
  //   !sdPairs.some(
  //     el => el.stimulusId === row.stimulusId
  //       && el.datafileId === row.datafileId,
  //   )
  // ) {
  //   sdPairs.push({
  //     stimulusId: row.stimulusId,
  //     datafileId: row.datafileId,
  //   });
  // }

  // row.aoiId = helpers.findOrInsert('aois', {
  //   name: row.aoiName,
  //   stimulusId: row.stimulusId,
  //   studyId: row.studyId,
  // });

  // Gazepoints.insert(row);
  // });

  // TODO improve by adding all datafileIds to set at once, too many DB calls as-is
  // sdPairs.forEach((pair) => {
  //   Stimuli.update(
  //     { _id: pair.stimulusId },
  //     {
  //       $addToSet: {
  //         datafileIds: pair.datafileId,
  //       },
  //     },
  //   );
  // });

  return {
    saccades,
    blinks,
    gazepoints,
    fixations,
  };
}
