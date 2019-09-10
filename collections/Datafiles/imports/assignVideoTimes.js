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

  let duplicateIndexCount = 0;

  binocularIndices.forEach((index) => {
    const stimulusRows = orderedStimulusIntakes.filter(
      row => row['Index Binocular'] * 1 === index,
    );

    const videoRows = orderedVideoIntakes.filter(
      row => row['Index Binocular'] * 1 === index,
    );

    if (stimulusRows.length !== videoRows.length) {
      if (stimulusRows.length - videoRows.length === 1) {
        if (
          stimulusRows[0]['RecordingTime [ms]']
          === stimulusRows[1]['RecordingTime [ms]']
        ) {
          // Duplicate row - remove the first row
          stimulusRows.shift();
        } else {
          console.log('');
          console.log('PROBLEM!');
          console.log(this.name);
          console.log(
            `intake mismatch! datafile name: ${
              this.name
            } binocular index: ${index} diff: ${stimulusRows.length
              - videoRows.length} video row count: ${
              videoRows.length
            } stimulus row count: ${stimulusRows.length}`,
          );
        }
      }
    }

    if (stimulusRows.length !== videoRows.length) {
      if (videoRows.length * 2 === stimulusRows.length) {
        // console.log('duplicate index!');
        duplicateIndexCount += 1;
        // TODO pick back up here!!! 2019-09-09 figure out what to do with the duplicates!
      } else {
        console.log(
          `intake mismatch! datafile name: ${
            this.name
          } binocular index: ${index} diff: ${stimulusRows.length
            - videoRows.length} video row count: ${
            videoRows.length
          } stimulus row count: ${stimulusRows.length}`,
        );
      }
    } else {
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
        // TODO video time are fucking shit! Don't use them!
        // TODO get the first row video time to use as a reference
        // TODO convert the video time to [ms]
        // TODO subtract the first row recordingTime from each of the recordingTimes (delta)
        // TODO add the new recordingTime (delta) to the first row video time and save to allRows[i].timestamp
        // TODO note that "timestamp" is a new variable. Modify Datafiles.renameRows() accordingly
        // OLD don't use this below
        // allRows[stimulusRows[i].rawDataIndex]['Video Time [h:m:s:ms]'] = videoRows[i]['Video Time [h:m:s:ms]'];
      }
    }
  });

  if (duplicateIndexCount > 0) {
    console.log(
      `datafile name: ${this.name} duplicate indices: ${duplicateIndexCount} of ${binocularIndices.length}`,
    );
  }

  return allRows;
}
