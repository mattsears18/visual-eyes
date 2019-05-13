const csv = require('csvtojson');

export default function getRawCSV() {
  return csv({ delimiter: 'auto' }).fromFile(this.path);
}
