const csv = require('csvtojson');
const _ = require('lodash/core');

async function getRawData(opts) {
  const { full } = opts || {};

  const rawData = await csv({ delimiter: 'auto' }).fromFile(
    this.getPathFilename(),
  );

  if (!this.fileFormat) {
    this.setFileFormat(rawData);
  }

  const basicColumns = [
    'RecordingTime [ms]', // smi
    'Video Time [h:m:s:ms]', // smi
    'Time of Day [h:m:s:ms]', // smi
    'Category Binocular', // smi
    'Index Binocular', // smi
    'Point of Regard Binocular X [px]', // smi
    'Point of Regard Binocular Y [px]', // smi
    'Stimulus', // smi
    'AOI Name Binocular', // smi

    'Timestamp', // imotions
    'FixationSeq', // imotions
    'GazeX', // imotions
    'GazeY', // imotions
    'FixationX', // imotions
    'FixationY', // imotions
    'FixationDuration', // imotions
    'StimulusName', // imotions
    'GazeAOI', // imotions
  ];

  if (full) {
    // return all basic columns, plus columns necessary for video time matching (SMI) - use lodash
    const fullColumns = [
      ...basicColumns,
      'Pupil Size Right X [px]',
      'Pupil Size Right Y [px]',
      'Pupil Diameter Right [mm]',
      'Pupil Size Left X [px]',
      'Pupil Size Left Y [px]',
      'Pupil Diameter Left [mm]',
      'Gaze Vector Right X',
      'Gaze Vector Right Y',
      'Gaze Vector Right Z',
      'Gaze Vector Left X',
      'Gaze Vector Left Y',
      'Gaze Vector Left Z',
      'Eye Position Right X [mm]',
      'Eye Position Right Y [mm]',
      'Eye Position Right Z [mm]',
      'Eye Position Left X [mm]',
      'Eye Position Left Y [mm]',
      'Eye Position Left Z [mm]',
    ];

    return rawData.map(row => _.pick(row, fullColumns));
  }

  // return basic columns - use lodash _.pick
  return rawData.map(row => _.pick(row, basicColumns));
}

export default getRawData;
