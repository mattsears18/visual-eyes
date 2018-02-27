Meteor.methods({
  'datafiles.process'({ datafileId }) {
    processDatafile(datafileId);
  },
});


function processDatafile(datafileId) {
  datafile = Datafiles.findOne({_id: datafileId});
  HTTP.call('GET', datafile.link(), (error, resp) => {
    if (error) {
      console.error(error);
    } else {
      if (!~[500, 404, 400].indexOf(resp.statusCode)) {
        Papa.parse(resp.content, {
          header: true,
          complete: function(results) {
            preprocessResults(results, datafile);
          },
        });
      }
    }
  });
}


function preprocessResults(results, datafile) {
  data = results.data;
  console.log('');
  console.log('preprocess data');

  //TODO clean up data before parsing

  processRecordings(data, datafile);
}


function processRecordings(data, datafile) {
  //TODO process file for new viewings, insert as necessary
  console.log('Process Recordings');
  console.log(datafile._id);

  Datafiles.update({_id: datafile._id}, {
    $set: {
      "recordings": data.length,
      "recordingsProcessed": 0,
    },
  });

  data.forEach(function(row, ri) {
    // console.log(ri);
    // console.log(row);
    // aoiId = getAoiId();
    // datafileId =


    Datafiles.update({_id: datafile._id}, {
      $set: {
        "recordingsProcessed": ri + 1,
      },
    });
  });

  processForViewings(data, datafile);
}


function processForViewings(data, datafile, callback) {
  //TODO process file for new viewings, insert as necessary
  console.log('Process for Viewings');
  console.log(datafile._id);

  Datafiles.update({_id: datafile._id}, {
    $set: {
      "processed": true,
    },
  });
}
