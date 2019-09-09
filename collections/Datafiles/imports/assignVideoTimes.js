// THIS IS ONLY NECESSARY FOR SMI FILES!!
const _ = require('lodash');

export default function assignVideoTimes(rawData) {
  if (!Meteor.isTest) console.log('Datafile.assignVideoTimes()');

  if (!rawData || !rawData.length) {
    throw Error('noRawData');
  }

  const allRows = [...rawData]; // clone (not reference)

  const stimulusIntakes = [];
  for (let i = 0; i < allRows.length; i += 1) {
    if (
      !allRows[i].Stimulus.includes('.avi')
      && allRows[i]['Category Binocular'] === 'Visual Intake'
    ) {
      // TODO only get the necessary fields
      stimulusIntakes.push({ rawDataIndex: i, ...allRows[i] });
    }
  }

  const orderedStimulusIntakes = _.orderBy(stimulusIntakes, [
    'Index Binocular',
    'RecordingTime [ms]',
  ]);

  const binocularIndices = Array.from(
    new Set(
      orderedStimulusIntakes.map(intake => intake['Index Binocular'] * 1),
    ),
  ).sort((a, b) => a - b);

  const allVideoIntakes = allRows.filter(
    row => row.Stimulus.includes('.avi')
      && row['Category Binocular'] === 'Visual Intake',
  );

  const videoIntakes = allVideoIntakes.filter(row => binocularIndices.includes(row['Index Binocular'] * 1));

  const orderedVideoIntakes = _.orderBy(videoIntakes, [
    'Index Binocular',
    'RecordingTime [ms]',
  ]);

  binocularIndices.forEach((index) => {
    const stimulusRows = orderedStimulusIntakes.filter(
      row => row['Index Binocular'] * 1 === index,
    );

    const videoRows = orderedVideoIntakes.filter(
      row => row['Index Binocular'] * 1 === index,
    );

    if (stimulusRows.length !== videoRows.length) {
      // throw new Error('intakeMismatch');
      console.log(
        `intake mismatch! binocular index: ${index} video row count: ${videoRows.length} stimulus row count: ${stimulusRows.length}`,
      );
    }
    //

    // console.log('');
    // console.log(`binocular index:    ${index}`);
    // console.log(`video row count:    ${videoRows.length}`);
    // console.log(`stimulus row count: ${videoRows.length}`);

    for (let i = 0; i < stimulusRows.length; i += 1) {
      // console.log(stimulusRows[i]);
      // console.log(
      //   `original video time: ${
      //     allRows[stimulusRows[i].rawDataIndex]['Video Time [h:m:s:ms]']
      //   }`,
      // );
      // console.log(`new video time: ${videoRows[i]['Video Time [h:m:s:ms]']}`);

      allRows[stimulusRows[i].rawDataIndex]['Video Time [h:m:s:ms]'] = videoRows[i]['Video Time [h:m:s:ms]'];
    }
  });

  return allRows;
}
