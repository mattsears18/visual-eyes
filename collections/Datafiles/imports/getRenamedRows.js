export default function getRenamedRows(rawCsvData) {
  // assume this.fileFormat is already set
  if (!rawCsvData || !rawCsvData.length) {
    throw Error('noRawCSVData');
  }

  const rows = [...rawCsvData];

  if (!this.fileFormat) {
    throw new Error('noFileFormat');
  }

  let headers;

  if (this.fileFormat === 'smi') {
    headers = [
      { original: 'RecordingTime [ms]', new: 'timestamp' },
      { original: 'Time of Day [h:m:s:ms]', new: 'timeOfDay' },
      { original: 'Category Binocular', new: 'category' },
      { original: 'Index Binocular', new: 'eventIndex' },
      { original: 'Point of Regard Binocular X [px]', new: 'x' },
      { original: 'Point of Regard Binocular Y [px]', new: 'y' },
      { original: 'Stimulus', new: 'stimulusName' },
      { original: 'AOI Name Binocular', new: 'aoiName' },
    ];
  } else if (this.fileFormat === 'imotions') {
    headers = [
      { original: 'Timestamp', new: 'timestamp' },
      { original: 'FixationSeq', new: 'eventIndex' },
      { original: 'GazeX', new: 'x' },
      { original: 'GazeY', new: 'y' },
      { original: 'StimulusName', new: 'stimulusName' },
      { original: 'GazeAOI', new: 'aoiName' },
    ];
  } else {
    throw new Error('unrecognizedFileFormat');
  }

  const renamedRows = [];

  for (let i = 0; i < rows.length; i += 1) {
    const renamedRow = {};
    headers.forEach((header) => {
      if ({}.hasOwnProperty.call(rows[i], header.original)) {
        renamedRow[header.new] = rows[i][header.original];
      }
    });

    renamedRows.push(renamedRow);
  }

  // imotions doesn't have categories so just add 'Visual Intake' to every row
  if (this.fileFormat === 'imotions') {
    for (let i = 0; i < renamedRows.length; i += 1) {
      renamedRows[i].category = 'Visual Intake';
    }
  }

  return renamedRows;
}
