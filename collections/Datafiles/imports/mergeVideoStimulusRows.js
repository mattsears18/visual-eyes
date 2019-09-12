// THIS IS ONLY NECESSARY FOR SMI FILES!!
import helpers from '../../../lib/helpers';

const _ = require('lodash');

export default function mergeVideoStimulusRows(rawData) {
  if (Meteor.isServer && !Meteor.isTest) console.log('Datafile.mergeVideoStimulusRows()');

  if (!rawData || !rawData.length) {
    throw Error('noRawData');
  }

  const allVideoRows = zeroVideoRecordingTimes([...rawData]); // clone (not reference)

  const stimulusIntakes = [...rawData].filter(
    row => !row.Stimulus.includes('.avi')
      && row['Category Binocular'] === 'Visual Intake',
  );

  // const stimulusBinocularIndices = Array.from(
  //   new Set(videoRows.map(intake => intake['Index Binocular'] * 1)),
  // ).sort((a, b) => a - b);

  const orderedStimulusIntakes = _.orderBy(stimulusIntakes, [
    'Index Binocular',
    'RecordingTime [ms]',
  ]);
  console.log(`all stimulus intake count: ${orderedStimulusIntakes.length}`);

  // const allVideoRows = allRows
  //   .filter(row => row.Stimulus.includes('.avi'))
  //   .sort((a, b) => {
  //     a['RecordingTime [ms]'] * 1 - b['RecordingTime [ms]'] * 1;
  //   });

  // const orderedVideoIntakes = _.orderBy(videoIntakes, ['RecordingTime [ms]']);

  // const binocularIndices = Array.from(
  //   new Set(allVideoRows.map(intake => intake['Index Binocular'] * 1)),
  // ).sort((a, b) => a - b);

  const processedRows = [];

  while (allVideoRows.length) {
    if (allVideoRows[0]['Category Binocular'] === 'Visual Intake') {
      if (allVideoRows[0].Stimulus.includes('.avi')) {
        // Row needs a stimulus!
        const binocularIndex = allVideoRows[0]['Index Binocular'] * 1;
        // const duplicateIndexCount = 0;
        // const removedRowsCount = 0;

        // Update all video rows for this binocular index
        const videoRows = [allVideoRows.shift()];

        while (
          allVideoRows.length
          && allVideoRows[0]['Index Binocular'] * 1 === binocularIndex
          && videoRows[0]['Category Binocular'] === 'Visual Intake'
        ) {
          videoRows.push(allVideoRows.shift());
        }

        const stimulusRows = orderedStimulusIntakes.filter(
          row => row['Index Binocular'] * 1 === binocularIndex,
        );

        console.log('');
        console.log(`binocular index:    ${binocularIndex}`);
        console.log(`video row count:    ${videoRows.length}`);
        console.log(`stimulus row count: ${stimulusRows.length}`);

        if (stimulusRows.length) {
          // video rows have matching stimulus rows
          console.log('matching stimulus rows!');

          // while (stimulusRows.length !== videoRows.length) {
          //   if (stimulusRows.length - videoRows.length === 1) {
          //     if (
          //       stimulusRows[0]['RecordingTime [ms]']
          //       === stimulusRows[1]['RecordingTime [ms]']
          //     ) {
          //       // Duplicate row - remove the first row
          //       stimulusRows.shift();
          //       removedRowsCount += 1;
          //     } else {
          //       console.log('');
          //       console.log('PROBLEM!');
          //       console.log(this.name);
          //       console.log(
          //         `intake mismatch! datafile name: ${
          //           this.name
          //         } binocularIndex: ${binocularIndex} diff: ${stimulusRows.length
          //           - videoRows.length} video row count: ${
          //           videoRows.length
          //         } stimulus row count: ${stimulusRows.length}`,
          //       );
          //       break;
          //     }
          //   } else if (videoRows.length * 2 === stimulusRows.length) {
          //     duplicateIndexCount += 1;
          //     console.log(
          //       `duplicate binocularIndex! datafile name: ${
          //         this.name
          //       } binocularIndex: ${binocularIndex} diff: ${stimulusRows.length
          //         - videoRows.length} video row count: ${
          //         videoRows.length
          //       } stimulus row count: ${stimulusRows.length}`,
          //     );
          //     break;
          //   } else {
          //     console.log(
          //       `intake mismatch! datafile name: ${
          //         this.name
          //       } binocularIndex: ${binocularIndex} diff: ${stimulusRows.length
          //         - videoRows.length} video row count: ${
          //         videoRows.length
          //       } stimulus row count: ${stimulusRows.length}`,
          //     );
          //     break;
          //   }
          // }
          // TODO check if all stimulus names are the same!!
          for (let i = 0; i < stimulusRows.length; i += 1) {
            stimulusRows[i]['RecordingTime [ms]'] = videoRows[i]['RecordingTime [ms]'];
          }
          processedRows.push(...stimulusRows);
        } else {
          // No visual intake on a stimulus for this index
          console.log('no matching stimulus rows!');
          for (let i = 0; i < videoRows.length; i += 1) {
            console.log('save stimulus name as "-"');
            videoRows[i].Stimulus = '-';
          }
          processedRows.push(...videoRows);
        }

        console.log(`save ${videoRows.length} rows`);
      } else {
        // video row already has a stimulus (not the .avi video)
        processedRows.push(allVideoRows.shift());
      }
    } else {
      processedRows.push(allVideoRows.shift());
    }
  }

  // binocularIndices.forEach((binocularIndex, ind) => {
  //   console.log(
  //     `binocular index: ${binocularIndex} [${ind + 1} of ${
  //       binocularIndices.length
  //     }]`,
  //   );

  //   const stimulusRows = orderedStimulusIntakes.filter(
  //     row => row['Index Binocular'] * 1 === binocularIndex,
  //   );

  //   const videoRows = orderedVideoIntakes.filter(
  //     row => row['Index Binocular'] * 1 === binocularIndex,
  //   );

  //   if (!stimulusRows.length) {
  //     for (let i = 0; i < videoRows.length; i += 1) {
  //       videoRows[i].Stimulus = '-';
  //     }
  //   } else {
  // while (stimulusRows.length !== videoRows.length) {
  //   if (stimulusRows.length - videoRows.length === 1) {
  //     if (
  //       stimulusRows[0]['RecordingTime [ms]']
  //       === stimulusRows[1]['RecordingTime [ms]']
  //     ) {
  //       // Duplicate row - remove the first row
  //       stimulusRows.shift();
  //       removedRowsCount += 1;
  //     } else {
  //       console.log('');
  //       console.log('PROBLEM!');
  //       console.log(this.name);
  //       console.log(
  //         `intake mismatch! datafile name: ${
  //           this.name
  //         } binocularIndex: ${binocularIndex} diff: ${stimulusRows.length
  //           - videoRows.length} video row count: ${
  //           videoRows.length
  //         } stimulus row count: ${stimulusRows.length}`,
  //       );
  //       break;
  //     }
  //   } else if (videoRows.length * 2 === stimulusRows.length) {
  //     duplicateIndexCount += 1;

  //     console.log(
  //       `duplicate binocularIndex! datafile name: ${
  //         this.name
  //       } binocularIndex: ${binocularIndex} diff: ${stimulusRows.length
  //         - videoRows.length} video row count: ${
  //         videoRows.length
  //       } stimulus row count: ${stimulusRows.length}`,
  //     );

  //     break;
  //   } else {
  //     console.log(
  //       `intake mismatch! datafile name: ${
  //         this.name
  //       } binocularIndex: ${binocularIndex} diff: ${stimulusRows.length
  //         - videoRows.length} video row count: ${
  //         videoRows.length
  //       } stimulus row count: ${stimulusRows.length}`,
  //     );
  //     break;
  //   }
  // }

  //     // TODO assign stimulus names
  //     // console.log(`video row count:    ${videoRows.length}`);
  //     // console.log(`stimulus row count: ${videoRows.length}`);

  //     console.log('video rows:');
  //     console.log(videoRows);
  //     console.log('');

  //     console.log('stimulus rows:');
  //     console.log(stimulusRows);
  //     console.log('');
  //   }

  //   // const initialVideoTimeHMS = videoRows[0]['Video Time [h:m:s:ms]'];
  //   // // TODO convert the video time to [ms]
  //   // const initialVideoTime = helpers.smiHMSToMS(initialVideoTimeHMS);

  //   // // console.log(`initial video time (HMS):     ${initialVideoTimeHMS}`);
  //   // // console.log(`initial video time (ms):      ${initialVideoTime}`);

  //   // const initialRecordingTime = stimulusRows[0]['RecordingTime [ms]'];
  //   // // console.log(`initial recording time (ms):  ${initialRecordingTime}`);

  //   // fs
  // });

  // if (duplicateIndexCount > 0) {
  //   console.log(
  //     `datafile name: ${this.name}, ${removedRowsCount} rows removed, duplicate indices: ${duplicateIndexCount} of ${binocularIndices.length}`,
  //   );
  // }

  return processedRows;
}

function zeroVideoRecordingTimes(rawData) {
  const videoRows = rawData
    .filter(row => row.Stimulus.includes('.avi'))
    .sort((a, b) => a['RecordingTime [ms]'] * 1 - b['RecordingTime [ms]'] * 1);

  const initialRecordingTime = videoRows[0]['RecordingTime [ms]'];
  // console.log(`initialRecordingTime: ${initialRecordingTime}`);

  for (let i = 0; i < videoRows.length; i += 1) {
    if (videoRows[i].Stimulus.includes('.avi')) {
      videoRows[i]['RecordingTime [ms]'] -= initialRecordingTime;
    }
  }

  return videoRows;
}
