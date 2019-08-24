const csv = require('csvtojson');

async function getRawCSV() {
  return csv({ delimiter: 'auto' }).fromFile(this.path);
}

export default getRawCSV;
