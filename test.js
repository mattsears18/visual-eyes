const csv = require('csvtojson');

async function doIt() {
  const a = await csv({ delimiter: 'auto' }).fromFile(
    '/Users/matthewsears/data/meteor/uploads/datafiles/r9CedmpXi7yiqxNmy.csv',
  );

  console.log(a.length);
}

doIt();
