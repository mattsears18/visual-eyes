import helpers from '../../../lib/helpers';
import Eyeevents from '../../Eyeevents/Eyeevents';
import Gazepoints from '../../Gazepoints/Gazepoints';

export default async function makeEyeevents() {
  let rows = [...(await this.getRenamedRows())];
  this.rawRowCount = rows.length;

  Datafiles.update(
    { _id: this._id },
    { $set: { rawRowCount: this.rawRowCount } },
  );

  rows = this.getStimuliOnly(rows);
  this.stimulusRowCount = rows.length;

  Datafiles.update(
    { _id: this._id },
    { $set: { stimulusRowCount: this.stimulusRowCount } },
  );

  // recompute timestamps from timeOfDay (required for SMI files)
  if (helpers.keyInArray('timeOfDay', rows)) {
    rows = this.recomputeTimestamps(rows);
  }

  // sort rows by timestamp
  rows = this.filterSortFloat('timestamp', rows);

  rows = assignStimuli(rows);
  rows = assignAois(rows); // TODO pick back up here 2019-08-22

  const saccades = 0;
  const blinks = 0;
  const gazepoints = 0;
  const fixations = 0;

  let lastEvent = '';
  const lastAoi = '';

  for (let i = 0; i < rows.length; i += 1) {
    if (!rows[i].stimulusId) {
      console.log(rows[i].stimulusId);
    }
    switch (rows[i].category) {
      case 'Visual Intake':
        // console.log('visual intake');
        lastEvent = 'visualIntake';
        break;
      case 'Saccade':
        // console.log('Saccade!');
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
  }

  // if (helpers.keyInArray('category', _data)) {
  //   console.log('has events');
  //   console.log(_data);
  // } else {
  //   console.log('does not have events');
  // }

  // make fixations
  // make blinks
  // make saccades
  // make visits
  // make glances

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

  return Eyeevents.find({ datafileId: this._id });
}

function assignStimuli(data) {
  console.log('assign stimuli');
  const rows = [...data];

  const stimuli = Stimuli.find({ studyId: this.studyId }).fetch();

  for (let i = 0; i < rows.length; i += 1) {
    const stimulus = stimuli.find(row => row.name === rows[i].stimulusName);

    if (typeof stimulus === 'undefined') {
      console.log(`make new stimulus for name: ${rows[i].stimulusName}`);
      const newStimulusId = helpers.findOrInsert('stimuli', {
        name: rows[i].stimulusName,
        studyId: this.studyId,
      });

      stimuli.push({ name: rows[i].stimulusName, _id: newStimulusId });
      rows[i].stimulusId = newStimulusId;
    } else {
      rows[i].stimulusId = stimulus._id;
    }
  }

  return rows;
}

function assignAois(data) {
  const rows = [...data];

  return rows;
}
