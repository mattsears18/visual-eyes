const csv = require('csvtojson');

async function getRawCSV() {
  const data = await csv({ delimiter: 'auto' }).fromFile(this.path);
  return data;
}

export default getRawCSV;
