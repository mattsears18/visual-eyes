Meteor.methods({
  'datafiles.process'({ datafileId }) {
    parseDatafile(datafileId);
  },
});


function parseDatafile(datafileId) {
  datafile = Datafiles.findOne({_id: datafileId});
  HTTP.call('GET', datafile.link(), (error, resp) => {
    if (error) {
      console.error(error);
    } else {
      if (!~[500, 404, 400].indexOf(resp.statusCode)) {
        Papa.parse(resp.content, {
          header: true,
          complete: function(results) {
            parseResults(results, datafile);
          },
        });
      }
    }
  });
}


function parseResults(results, datafile) {
  data = results.data;
  console.log(data);

  parseRecordings(data, datafile, parseForViewings);

  Datafiles.update({_id: datafile._id}, {
    $set: {
      "processed": true,
    },
  });
}


function parseRecordings(data, datafile, callback) {
  //TODO parse file for new viewings, insert as necessary
  console.log('Parse Recordings');
  console.log(datafile._id);

  // foreach
  // aoiId = getAoiId();
  // datafileId =

  callback(data, datafile);
}


function parseForViewings(data, datafile) {
  //TODO parse file for new viewings, insert as necessary
  console.log('Parse for Viewings');
  console.log(datafile._id);
}
