export default function detectFileFormat(rawData) {
  if (!rawData || !rawData.length) {
    throw Error('noRawData');
  }

  const rows = [...rawData];
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
