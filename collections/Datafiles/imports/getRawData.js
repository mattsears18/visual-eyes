const csv = require('csvtojson');
const _ = require('lodash/core');

async function getRawData(opts) {
  if (Meteor.isServer && !Meteor.isTest) console.log('Datafiles.getRawData()');
  const hrstart = process.hrtime();

  const { full } = opts || {};

  let colReg;

  if (full) {
    colReg = /(^RecordingTime \[ms\]$|^Category Binocular$|^Index Binocular$|^Point of Regard Binocular X \[px\]$|^Point of Regard Binocular Y \[px\]$|^Stimulus$|^AOI Name Binocular$|^Timestamp$|^FixationSeq$|^GazeX$|^GazeY$|^FixationX$|^FixationY$|^FixationDuration$|^StimulusName$|^GazeAOI$|^Pupil Size Right X \[px\]$|^Pupil Size Right Y \[px\]$|^Pupil Diameter Right \[mm\]$|^Pupil Size Left X \[px\]$|^Pupil Size Left Y \[px\]$|^Pupil Diameter Left \[mm\]$|^Gaze Vector Right X$|^Gaze Vector Right Y$|^Gaze Vector Right Z$|^Gaze Vector Left X$|^Gaze Vector Left Y$|^Gaze Vector Left Z$|^Eye Position Right X \[mm\]$|^Eye Position Right Y \[mm\]$|^Eye Position Right Z \[mm\]$|^Eye Position Left X \[mm\]$|^Eye Position Left Y \[mm\]$|^Eye Position Left Z \[mm\])/;
  } else {
    colReg = /(RecordingTime \[ms\]$|^Category Binocular$|^Index Binocular$|^Point of Regard Binocular X \[px\]$|^Point of Regard Binocular Y \[px\]$|^Stimulus$|^AOI Name Binocular$|^Timestamp$|^FixationSeq$|^GazeX$|^GazeY$|^FixationX$|^FixationY$|^FixationDuration$|^StimulusName$|^GazeAOI)/;
  }

  const rawData = await csv({
    delimiter: 'auto',
    checkType: true,
    includeColumns: colReg,
  }).fromFile(this.getPathFilename());

  if (!this.fileFormat) {
    this.setFileFormat(rawData);
  }

  this.rawRowCount = rawData.length;

  if (Meteor.isServer && !Meteor.isTest) console.log(`raw row count: ${this.rawRowCount}`);

  Datafiles.update(
    { _id: this._id },
    { $set: { rawRowCount: this.rawRowCount } },
  );

  const hrend = process.hrtime(hrstart);

  if (Meteor.isServer && !Meteor.isTest) {
    console.info(
      'Time to get raw data (hr): %ds %dms',
      hrend[0],
      hrend[1] / 1000000,
    );
  }

  return rawData;
}

export default getRawData;
