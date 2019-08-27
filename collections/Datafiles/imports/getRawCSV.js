const csv = require('csvtojson');

async function getRawCSV() {
  return csv({ delimiter: 'auto' }).fromFile(this.getPathFilename());
}

// TODO go ahead and filter out the unneeded columns right here to save memory!

export default getRawCSV;
