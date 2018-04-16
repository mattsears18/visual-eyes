Meteor.methods({
  'datafiles.process'({ datafileId, studyId }) {
    datafile = Datafiles.findOne({_id: datafileId});

    if(datafile) {
      console.log('datafile._id: ' + datafile._id + ' FOUND');

      Datafiles.update({_id: datafileId},
        {
          $set: {
            "processing": false,
            "preprocessing": true,
            "studyId": studyId,
          },
        },
        function(err, num) {
          datafile = Datafiles.findOne({_id: datafileId});
          processDatafile(datafile);
        }
      );
    } else {
      console.log('datafile._id: ' + datafileId + ' NOT FOUND');
    }
  },
});


function processDatafile(datafile) {
  if(!datafile.processed) {
    if(!datafile.recordings || !datafile.recordingsProcessed || (datafile.recordings != datafile.recordingsProcessed)) {
      //TODO process a local file or a cached s3 file somehow, this HTTP call is crazy motherfucking slow
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
    console.log('already processed: ' + datafile._id);
    Datafiles.update({_id: datafile._id}, {
      $set: {
        "preprocessing": false,
        "processing": false,
        "processed": true,
      },
    });
  }
}


function preprocessResults(results, datafile) {
  if(!datafile.processing) {
    if(!datafile.processed) {
      //only process files if they aren't already being processed
      data = results.data;
      data = renameHeaders(data);

      //TODO figure out how to integrate dburles:collection-helpers with ostrio:Meteor-FilesCollection
      //for now, just add the .study reference helper manually
      datafile.study = Studies.findOne({_id: datafile.studyId});

      if(datafile.study.removeDuplicateIndices) {
        data = removeDuplicateIndices(data);
      }

      if(datafile.study.recordVisualIntakesOnly) {
        data = getVisualIntakesOnly(data);
      }

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
      if(!indices.includes(ref)) {
        indices.push(ref);
        goodRows.push(row);
      }
    }
  });

  return goodRows;
}


function getVisualIntakesOnly(data) {
  console.log('get visual intakes only');
  return data.filter(row => row.category == 'Visual Intake');
}


function processRecordings(cleanData, datafile) {
  //TODO process file for new viewings, insert as necessary
  console.log('Process recordings: ' + datafile._id);

  datafile.preprocessing = false;
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

  cleanData.forEach(function(row, ri) {
    aoiId = getAoiId(row, aois, datafile);

    row.aoiId = aoiId;
    row.studyId = datafile.studyId;
    row.datafileId = datafile._id;

    // console.log(row);
    // console.log(ri);

    Recordings.insert(row);
    //TODO only insert if unique when ignoring datafileId
    //TODO datafile onDelete hook, cascade delete recordings

    Datafiles.update({_id: datafile._id}, {
      $set: {
        "recordingsProcessed": ri + 1,
      },
    });
  });

  processForViewings(cleanData, datafile);
}

function getAoiId(row, aois, datafile) {
  aoi = aois.find(function(aoi) {
    return aoi.name == row.aoiName;
  });

  if(aoi) {
    //TODO add datafile._id to a list of Aoi.datafileIds
    aoiId = aoi._id;
  } else {
    newAoiId = Aois.insert({
      name: row.aoiName,
      studyId: datafile.studyId,
      datafileIds: [datafile._id],
    });

    aois.push({'name': row.aoiName, '_id': newAoiId});

    aoiId = newAoiId;
  }

  Aois.update({_id: aoiId}, {
    $addToSet: {
      datafileIds: datafile._id,
    },
  });

  return aoiId;
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

export {
  renameHeaders,
  removeDuplicateIndices,
  getVisualIntakesOnly,
  getAoiId,
}
