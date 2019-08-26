const csv = require('csvtojson');

async function getRawCSV() {
  return csv({ delimiter: 'auto' }).fromFile(this.getPathFilename());
}

export default getRawCSV;
