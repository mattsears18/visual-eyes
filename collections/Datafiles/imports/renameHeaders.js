export default function renameHeaders(rows) {
  let headers;

  if (!this.fileFormat) {
    throw new Error('noFileFormat');
  }

  if (!rows || !rows.length) {
    throw new Error('noCSVData');
  }

  if (this.fileFormat == 'smi') {
    headers = [
      { original: 'RecordingTime [ms]', new: 'timestamp' },
      { original: 'Time of Day [h:m:s:ms]', new: 'timeOfDay' },
      { original: 'Category Binocular', new: 'category' },
      { original: 'Index Binocular', new: 'fixationIndex' },
      { original: 'Point of Regard Binocular X [px]', new: 'x' },
      { original: 'Point of Regard Binocular Y [px]', new: 'y' },
      { original: 'Stimulus', new: 'stimulusName' },
      { original: 'AOI Name Binocular', new: 'aoiName' },
    ];
  } else if (this.fileFormat == 'imotions') {
    headers = [
      { original: 'Timestamp', new: 'timestamp' },
      { original: 'FixationSeq', new: 'fixationIndex' },
      { original: 'GazeX', new: 'x' },
      { original: 'GazeY', new: 'y' },
      { original: 'StimulusName', new: 'stimulusName' },
      { original: 'GazeAOI', new: 'aoiName' },
    ];
  } else {
    throw new Error('unrecognizedFileFormat');
  }

  const cleanData = [];
  rows.forEach((row, ri) => {
    const cleanRow = {};
    headers.forEach((header) => {
      if (row.hasOwnProperty(header.original)) {
        cleanRow[header.new] = row[header.original];
      }
    });

    cleanData.push(cleanRow);
  });

  return cleanData;
}
