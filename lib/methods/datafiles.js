Meteor.methods({
  'datafiles.process'({ datafileId }) {
    datafile = Datafiles.findOne({_id: datafileId});
    processDatafile(datafile);
  },
});


function processDatafile(datafile) {
  if(datafile) {
    HTTP.call('GET', datafile.link(), (error, resp) => {
      if (error) {
        console.error(error);
      } else {
        if (!~[500, 404, 400].indexOf(resp.statusCode)) {
          Papa.parse(resp.content, {
            header: true,
            complete: function(results) {
              //TODO figure out why this gets called twice
              preprocessResults(results, datafile);
            },
          });
        }
      }
    });
  }
}


function preprocessResults(results, datafile) {
  if(!datafile.processing) {
    if(!datafile.processed) {
      //only process files if they aren't already being processed
      datafile.processing = true;

      Datafiles.update({_id: datafile._id}, {
        $set: {
          "processing": true,
        },
      });

      data = results.data;
      console.log('preprocess: ' + datafile._id);

      //TODO clean up data before parsing

      processRecordings(data, datafile);
    } else {
      console.log('already finished processing: ' + datafile._id);
    }
  } else {
    console.log('already processing: ' + datafile._id);
  }
}


function processRecordings(data, datafile) {
  //TODO process file for new viewings, insert as necessary
  console.log('Process recordings: ' + datafile._id);

  Datafiles.update({_id: datafile._id}, {
    $set: {
      "recordings": data.length,
      "recordingsProcessed": 0,
    },
  });

  data.forEach(function(row, ri) {
    //TODO save recordings
    aoiId = getAoiId(row);
    // console.log('AoiId: ' + aoiId);
    // datafileId =

    Datafiles.update({_id: datafile._id}, {
      $set: {
        "recordingsProcessed": ri + 1,
      },
    });
  });

  processForViewings(data, datafile);
}


function getAoiId(row) {
  return 5;
}


function processForViewings(data, datafile, callback) {
  //TODO process file for new viewings, insert as necessary
  console.log('Process for Viewings: ' + datafile._id);

  Datafiles.update({_id: datafile._id}, {
    $set: {
      "processed": true,
      "processing": false,
    },
  });
}
