// THIS IS ONLY NECESSARY FOR SMI FILES!!
import helpers from '../../../lib/helpers';

const _ = require('lodash');

export default function assignVideoTimes(rawData) {
  if (Meteor.isServer && !Meteor.isTest) console.log('Datafile.assignVideoTimes()');

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

  let duplicateIndexCount = 0;
  let removedRowsCount = 0;

  binocularIndices.forEach((binocularIndex, ind) => {
    // console.log(
    //   `binocular index: ${binocularIndex} [${ind + 1} of ${
    //     binocularIndices.length
    //   }]`,
    // );

    const stimulusRows = orderedStimulusIntakes.filter(
      row => row['Index Binocular'] * 1 === binocularIndex,
    );

    const videoRows = orderedVideoIntakes.filter(
      row => row['Index Binocular'] * 1 === binocularIndex,
    );

    while (stimulusRows.length !== videoRows.length) {
      if (stimulusRows.length - videoRows.length === 1) {
        if (
          stimulusRows[0]['RecordingTime [ms]']
          === stimulusRows[1]['RecordingTime [ms]']
        ) {
          // Duplicate row - remove the first row
          stimulusRows.shift();
          removedRowsCount += 1;
        } else {
          console.log('');
          console.log('PROBLEM!');
          console.log(this.name);
          console.log(
            `intake mismatch! datafile name: ${
              this.name
            } binocularIndex: ${binocularIndex} diff: ${stimulusRows.length
              - videoRows.length} video row count: ${
              videoRows.length
            } stimulus row count: ${stimulusRows.length}`,
          );
          break;
        }
      } else if (videoRows.length * 2 === stimulusRows.length) {
        duplicateIndexCount += 1;

        console.log(
          `duplicate binocularIndex! datafile name: ${
            this.name
          } binocularIndex: ${binocularIndex} diff: ${stimulusRows.length
            - videoRows.length} video row count: ${
            videoRows.length
          } stimulus row count: ${stimulusRows.length}`,
        );

        break;
      } else {
        console.log(
          `intake mismatch! datafile name: ${
            this.name
          } binocularIndex: ${binocularIndex} diff: ${stimulusRows.length
            - videoRows.length} video row count: ${
            videoRows.length
          } stimulus row count: ${stimulusRows.length}`,
        );
        break;
      }
    }

    // console.log('');
    // console.log(`binocularIndex:    ${binocularIndex}`);
    // console.log(`video row count:    ${videoRows.length}`);
    // console.log(`stimulus row count: ${videoRows.length}`);

    const initialVideoTimeHMS = videoRows[0]['Video Time [h:m:s:ms]'];
    // TODO convert the video time to [ms]
    const initialVideoTime = helpers.smiHMSToMS(initialVideoTimeHMS);

    // console.log(`initial video time (HMS):     ${initialVideoTimeHMS}`);
    // console.log(`initial video time (ms):      ${initialVideoTime}`);

    const initialRecordingTime = stimulusRows[0]['RecordingTime [ms]'];
    // console.log(`initial recording time (ms):  ${initialRecordingTime}`);

    for (let i = 0; i < stimulusRows.length; i += 1) {
      allRows[stimulusRows[i].rawDataIndex].timestamp = initialVideoTime * 1
        + stimulusRows[i]['RecordingTime [ms]'] * 1
        - initialRecordingTime * 1;
    }
  });

  if (duplicateIndexCount > 0) {
    console.log(
      `datafile name: ${this.name}, ${removedRowsCount} rows removed, duplicate indices: ${duplicateIndexCount} of ${binocularIndices.length}`,
    );
  }

  return allRows;
}
