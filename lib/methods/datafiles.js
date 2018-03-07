Meteor.methods({
  'datafiles.process'({ datafileId, studyId }) {
    datafile = Datafiles.findOne({_id: datafileId});
    processDatafile(datafile, studyId);
  },
});


function processDatafile(datafile, studyId) {
  if(datafile && !datafile.processed) {
    if(!datafile.studyId) {

      console.log('preprocess: ' + datafile._id);
      datafile.preprocessing = true;

      Datafiles.update({_id: datafile._id}, {
        $set: {
          "studyId": studyId,
          "preprocessing": true,
        },
      });

      datafile.studyId = studyId;
    }

    if(!datafile.recordings || !datafile.recordingsProcessed || (datafile.recordings != datafile.recordingsProcessed)) {
      //TODO process a locl file or a cached s3 file somehow, this HTTP call is crazy motherfucking slow
      HTTP.call('GET', datafile.link(), (error, resp) => {
        if (error) {
          console.error(error);
        } else {
          if (!~[500, 404, 400].indexOf(resp.statusCode)) {

            // Reaplce all carraige returns with newlines
            content = resp.content.replace(/[\r]/g, '\n');

            Papa.parse(content, {
              header: true,
              worker: true,
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
  } else {
    if(datafile) {
      console.log('already processed: ' + datafile._id);
      Datafiles.update({_id: datafile._id}, {
        $set: {
          "preprocessing": false,
          "processing": false,
        },
      });
    }
  }
}


function preprocessResults(results, datafile) {
  if(!datafile.processing) {
    if(!datafile.processed) {
      //only process files if they aren't already being processed
      data = results.data;
      data = renameHeaders(data);
      // data = removeDuplicateIndices(data);

      processRecordings(data, datafile);
    } else {
      console.log('already finished processing: ' + datafile._id);
    }
  } else {
    console.log('already processing: ' + datafile._id);
  }
}


function renameHeaders(data) {
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

  data.forEach(function(row, ri) {
    cleanRow = {};

    headers.forEach(function(header) {
      if(row[header.original]) {
        cleanRow[header.new] = row[header.original];
      }
    });

    cleanData.push(cleanRow);
  });

  return cleanData;
}


function removeDuplicateIndices(data) {
  console.log('remove duplicate indices');

  goodRows = [];
  indices = [];

  data.forEach(function(row) {
    if(Number.isInteger(parseInt(row.index))){
      ref = row.index + ', ' + row.aoiName;
      if(indices.includes(ref)) {
        console.log('already exists');
      } else {
        console.log('new!');
        indices.push(ref);
        goodRows.push(row);
      }
    }
  });

  console.log(goodRows);

  return goodRows;
}


function processRecordings(cleanData, datafile) {
  //TODO process file for new viewings, insert as necessary
  console.log('Process recordings: ' + datafile._id);

  datafile.preprocessing = true;
  datafile.processing = true;

  Datafiles.update({_id: datafile._id}, {
    $set: {
      "preprocessing": false,
      "processing": true,
      "recordings": cleanData.length,
      "recordingsProcessed": 0,
    },
  });

  aois = Aois.find({"studyId": datafile.studyId}).fetch();
  // console.log(aois);

  cleanData.forEach(function(row, ri) {
    //TODO save recordings
    aoiId = getAoiId(row, aois, datafile);
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

function getAoiId(row, aois, datafile) {
  // console.log(aois.length);

  aoi = aois.find(function(aoi) {
    return aoi.name == row.aoiName;
  });

  if(aoi) {
    // Existing AOI found!
    // console.log('\'' + row.aoiName + '\': found it!');
    // return aoi._id;
  } else {
    // No existing AOI found, make a new one
    // console.log('\'' + row.aoiName + '\': not found, make a new one');
    newAoiId = Aois.insert({
      name: row.aoiName,
      studyId: datafile.studyId,
    });

    aois.push({'name': row.aoiName, '_id': newAoiId});
  }
  // console.log(row.aoiName);
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
