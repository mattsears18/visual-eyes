export default async function detectFileFormat() {
  let fileFormat;
  const rows = await this.getRawCSV();

  if (rows[0].hasOwnProperty('Point of Regard Binocular X [px]')) {
    fileFormat = 'smi';
  } else if (rows[0].hasOwnProperty('GazeX')) {
    fileFormat = 'imotions';
  }

  return fileFormat;
}
