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

  const orderedStimulusIntakes = _.orderBy(stimulusIntakes, [
    'Index Binocular',
    'RecordingTime [ms]',
  ]);

  if (Meteor.isServer && !Meteor.isTest) {
    console.log(`all stimulus intake count: ${orderedStimulusIntakes.length}`);
  }

  const processedRows = [];
  let badStimulusRowCount = 0;

  while (allVideoRows.length) {
    if (allVideoRows[0]['Category Binocular'] === 'Visual Intake') {
      // Row needs a stimulus!
      const binocularIndex = allVideoRows[0]['Index Binocular'] * 1;

      // Update all video rows for this binocular index
      // get the first row
      const videoRows = [allVideoRows.shift()];

      // get all other rows with the same binocular index
      while (
        allVideoRows.length
        && allVideoRows[0]['Index Binocular'] * 1 === binocularIndex
        && videoRows[0]['Category Binocular'] === 'Visual Intake'
      ) {
        videoRows.push(allVideoRows.shift());
      }

      let stimulusRows = orderedStimulusIntakes.filter(
        row => row['Index Binocular'] * 1 === binocularIndex,
      );

      if (stimulusRows.length) {
        // video rows have matching stimulus rows
        while (
          stimulusRows.length
          && stimulusRows.length !== videoRows.length
        ) {
          if (stimulusRows.length - videoRows.length === 1) {
            if (
              stimulusRows[0]['RecordingTime [ms]']
              === stimulusRows[1]['RecordingTime [ms]']
            ) {
              // Duplicate row - remove the first row
              stimulusRows.shift();
              badStimulusRowCount += 1;
            } else if (Meteor.isServer && !Meteor.isTest) {
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
            }
          } else if (videoRows.length * 2 === stimulusRows.length) {
            // these are transitions between stimuli (page turns) don't assign a stimulus to them
            badStimulusRowCount += stimulusRows.length;
            if (Meteor.isServer && !Meteor.isTest) {
              console.log(
                `duplicate binocularIndex! datafile name: ${
                  this.name
                } binocularIndex: ${binocularIndex} diff: ${stimulusRows.length
                  - videoRows.length} video row count: ${
                  videoRows.length
                } stimulus row count: ${stimulusRows.length}`,
              );
            }
            stimulusRows = [];
            break;
          } else {
            if (Meteor.isServer && !Meteor.isTest) {
              console.log(
                `intake mismatch! datafile name: ${
                  this.name
                } binocularIndex: ${binocularIndex} diff: ${stimulusRows.length
                  - videoRows.length} video row count: ${
                  videoRows.length
                } stimulus row count: ${stimulusRows.length}`,
              );
            }
            stimulusRows = [];
            break;
          }
        }
      }

      if (stimulusRows.length) {
        if (stimulusRows.length !== videoRows.length) {
          if (Meteor.isServer && !Meteor.isTest) {
            console.log('issue!');
            console.log(`stimulusRows: ${stimulusRows.length}`);
            console.log(`videoRows:    ${videoRows.length}`);
          }
        } else {
          // get the recording time from the video rows and save everything else from the stimulus rows
          for (let i = 0; i < stimulusRows.length; i += 1) {
            stimulusRows[i]['RecordingTime [ms]'] = videoRows[i]['RecordingTime [ms]'];
          }
          processedRows.push(...stimulusRows);
        }
      } else {
        // No visual intake on a stimulus for this index
        for (let i = 0; i < videoRows.length; i += 1) {
          videoRows[i].Stimulus = '-';
        }
        processedRows.push(...videoRows);
      }
    } else {
      // row is not a visual intake
      // TODO eventually do saccades and blinks maybe
      const row = allVideoRows.shift();
      row.Stimulus = '-';
      processedRows.push(row);
    }
  }

  if (Meteor.isServer && !Meteor.isTest) {
    console.log(`processed rows: ${processedRows.length}`);
    console.log(`bad stimulus row count: ${badStimulusRowCount}`);
  }

  return processedRows;
}

function zeroVideoRecordingTimes(rawData) {
  const videoRows = rawData
    .filter(row => row.Stimulus.includes('.avi'))
    .sort((a, b) => a['RecordingTime [ms]'] * 1 - b['RecordingTime [ms]'] * 1);

  const initialRecordingTime = videoRows[0]['RecordingTime [ms]'];

  for (let i = 0; i < videoRows.length; i += 1) {
    if (videoRows[i].Stimulus.includes('.avi')) {
      videoRows[i]['RecordingTime [ms]'] -= initialRecordingTime;
    }
  }

  return videoRows;
}
