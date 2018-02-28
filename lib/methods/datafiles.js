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

          // Reaplce all carraige returns with newlines
          content = resp.content.replace(/[\r]/g, '\n');

          Papa.parse(content, {
            header: true,
            delimiter: ',',
            newline: '\n',
            skipEmptyLines: true,
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

      headers = [
        {'original': 'RecordingTime [ms]', 'new': 'recordingTime'},
        {'original': 'Time of Day [h:m:s:ms]', 'new': 'timeOfDay'},
        {'original': 'Category Binocular', 'new': 'category'},
        {'original': 'Index Binocular', 'new': 'index'},
        {'original': 'Point of Regard Binocular X [px]', 'new': 'x'},
        {'original': 'Point of Regard Binocular Y [px]', 'new': 'y'},
        {'original': 'AOI Name Binocular', 'new': 'aoiName'},
      ];

      cleanData = [];

      //////////////////////////////////////////////////////////////////////////
      data.forEach(function(row, ri) {
        cleanRow = {};

        headers.forEach(function(header) {
          if(row[header.original]) {
            cleanRow[header.new] = row[header.original];
          }
        });

        cleanData.push(cleanRow);
      });
      //////////////////////////////////////////////////////////////////////////

      processRecordings(cleanData, datafile);
    } else {
      console.log('already finished processing: ' + datafile._id);
    }
  } else {
    console.log('already processing: ' + datafile._id);
  }
}


function processRecordings(cleanData, datafile) {
  //TODO process file for new viewings, insert as necessary
  console.log('Process recordings: ' + datafile._id);

  Datafiles.update({_id: datafile._id}, {
    $set: {
      "recordings": cleanData.length,
      "recordingsProcessed": 0,
    },
  });

  aois = [];

  cleanData.forEach(function(row, ri) {
    //TODO save recordings
    aoiId = getAoiId(row, aois);
    // console.log('AoiId: ' + aoiId);
    // datafileId =

    Datafiles.update({_id: datafile._id}, {
      $set: {
        "recordingsProcessed": ri + 1,
      },
    });
  });

  processForViewings(cleanData, datafile);
}


function getAoiId(row, aois) {
  // Aois.findAndModify({
  //   query: { _id: "some potentially existing id" },
  //   update: {
  //     $setOnInsert: { foo: "bar" }
  //   },
  //   new: true,   // return new doc if one is upserted
  //   upsert: true // insert the document if it does not exist
  // });
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
