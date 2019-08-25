export default function generateEyeevents(assignedRows) {
  // assume rows have already been sorted by timestamp
  // assume all rows have a stimulusId

  if (!assignedRows || !assignedRows.length) {
    throw Error('noAssignedRows');
  }

  const rows = [...assignedRows];

  const saccades = [];
  const blinks = [];
  const gazepoints = [];
  const fixations = [];

  let lastEvent;
  const lastAoiId = '';
  const lastStimulusId = '';

  let currentFixation;

  for (let i = 0; i < rows.length; i += 1) {
    switch (rows[i].category) {
      case 'Visual Intake':
        gazepoints.push(rows[i]);
        if (rows[i].eventIndex) {
          if (
            !currentFixation
            || currentFixation.index !== rows[i].eventIndex
          ) {
            // new fixation!
            if (currentFixation) {
              // save the old fixation
              fixations.push(currentFixation);
            }

            currentFixation = {
              timestamp: rows[i].timestamp,
              index: rows[i].eventIndex,
              x: this.fileFormat === 'imotions' ? rows[i].fixationX : rows[i].x,
              y: this.fileFormat === 'imotions' ? rows[i].fixationY : rows[i].y,
              duration:
                this.fileFormat === 'imotions' ? rows[i].fixationDuration : 0,
            };
          } else {
            // continue fixation!
            if (this.fileFormat !== 'imotions') {
              currentFixation.duration = rows[i].timestamp - currentFixation.timestamp;
            }
          }
        }

        lastEvent = 'visualIntake';
        break;
      case 'Saccade':
        saccades.push(rows[i]);
        lastEvent = 'saccade';
        break;
      case 'Blink':
        blinks.push(rows[i]);
        lastEvent = 'blink';
        break;
      case 'User Event':
        break;
      case '-':
        break;

      default:
        console.log('invalid recorded row category');
        console.log(rows[i]);
    }
  }

  if (currentFixation) {
    // end the last fixation
    fixations.push(currentFixation);
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
