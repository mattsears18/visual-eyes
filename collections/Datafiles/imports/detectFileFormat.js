export default function detectFileFormat(rawCsvData) {
  if (!rawCsvData || !rawCsvData.length) {
    throw Error('noRawCSVData');
  }

  const rows = [...rawCsvData];
  let fileFormat;

  if (
    Object.prototype.hasOwnProperty.call(
      rows[0],
      'Point of Regard Binocular X [px]',
    )
  ) {
    fileFormat = 'smi';
  } else if (Object.prototype.hasOwnProperty.call(rows[0], 'GazeX')) {
    fileFormat = 'imotions';
  }

  return fileFormat;
}
