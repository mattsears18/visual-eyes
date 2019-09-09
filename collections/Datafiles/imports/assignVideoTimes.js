// THIS IS ONLY NECESSARY FOR SMI FILES!!
const _ = require('lodash');

export default function assignVideoTimes(rawCsvData) {
  if (!Meteor.isTest) console.log('Datafile.assignVideoTimes()');

  if (!rawCsvData || !rawCsvData.length) {
    throw Error('noRawCsvData');
  }

  const allRows = [...rawCsvData];

  const stimulusIntakes = allRows.filter(
    row => !row.Stimulus.includes('.avi')
      && row['Category Binocular'] === 'Visual Intake',
  );

  const orderedStimulusIntakes = _.orderBy(stimulusIntakes, [
    'Index Binocular',
    'RecordingTime [ms]',
  ]);

  const stimulusIntakeIndices = Array.from(
    new Set(
      orderedStimulusIntakes.map(intake => intake['Index Binocular'] * 1),
    ),
  ).sort((a, b) => a - b);

  const allVideoIntakes = allRows.filter(
    row => row.Stimulus.includes('.avi')
      && row['Category Binocular'] === 'Visual Intake',
  );

  const videoIntakes = allVideoIntakes.filter(row => stimulusIntakeIndices.includes(row['Index Binocular'] * 1));

  const orderedVideoIntakes = _.orderBy(videoIntakes, [
    'Index Binocular',
    'RecordingTime [ms]',
  ]);

  stimulusIntakeIndices.forEach((index) => {
    const stimulusRows = orderedStimulusIntakes.filter(
      row => row['Index Binocular'] * 1 === index,
    );

    const videoRows = orderedVideoIntakes.filter(
      row => row['Index Binocular'] * 1 === index,
    );

    if (stimulusRows.length !== videoRows.length) {
      throw new Error('intakeMismatch');
    }

    for (let i = 0; i < stimulusRows.length; i += 1) {
      stimulusRows[i]['Video Time [h:m:s:ms]'] = videoRows[i]['Video Time [h:m:s:ms]'];

      // TODO pick back up here 2019-09-06 - find the original (raw) stimulus row in allRows and save the video time to it!!

      // TODO then in Datafiles.getRenamesRows() set the timestamp to the video time instead of the 'recordingTime' - of course, have to convert the video times to [ms]

      // const realRow = allRows.find();

      // console.log('real row:');
      // console.log(realRow);
    }
  });
  // return stimulusRows;
  return allRows;
}
