import { makeDatafileStats } from './makeDatafileStats';
import { makeAoiStats } from '../Aois/makeAoiStats';
import Jobs from '../../../collections/Jobs/Jobs';
fs = require('fs');
const csv = require('csvtojson');

Meteor.methods({
  'datafiles.process'({ datafileId, callback }) {
    jobDoc = Jobs.findOne({type: 'datafiles.process', data: { datafileId: datafileId}});
    job = Jobs.getJob(jobDoc._id);

    datafile = Datafiles.findOne({_id: datafileId});

    if(datafile) {
      console.log('datafile._id: ' + datafile._id + ' FOUND');

      study = Studies.findOne({ datafileIds: datafile._id });

      if(study) {
        console.log('datafile has a study');

        Studies.update({ _id: study._id }, { $set: { datafilesProcessing: true, datafilesProcessed: false }});

        datafile.studyId = study._id;
        Datafiles.update({ _id: datafile._id }, { $set: { studyId: datafile.studyId }}, function(err, num) {
          if(err) {
            console.log(err.error);
            job.fail();
          } else {
            preProcessDatafile(datafile, job, callback);
          }
        });
      } else {
        console.log('datafile does not have a study yet!');
        job.fail('datafiles.noStudy');
        callback();
      }
    } else {
      console.log('datafile._id: ' + datafileId + ' NOT FOUND');
      job.fail('datafiles.datafileDoesNotExist');
      job.cancel();
      callback();
    }
  }
});

function preProcessDatafile(datafile, job, callback) {
  if(!datafile.processed) {
    console.log('begin preprocessing datafile');

    console.log('delete any recordings referencing this datafile');
    Recordings.remove({datafileId: datafile._id});

    datafile.preprocessing = true;
    datafile.processing = false;
    datafile.processed = false;
    datafile.recordingsProcessed = 0;

    Datafiles.update({ _id: datafile._id }, { $set: {
      "preprocessing": true,
      "processing": false,
      "processed": false,
      "recordingsProcessed": 0,
    }});

    if(!datafile.recordings || !datafile.recordingsProcessed || (datafile.recordings != datafile.recordingsProcessed)) {
      csv()
        .fromFile(datafile.path)
        .then(Meteor.bindEnvironment((results) => {
          preprocessResults(results, datafile, job, callback);
        }));
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

    job.done();
    callback();
  }
}


function preprocessResults(results, datafile, job, callback) {
  if(!datafile.processing) {
    if(!datafile.processed) {
      console.log('begin preprocessing results');
      //only process files if they aren't already being processed
      data = results;
      data = renameHeaders(data);

      console.log('studyId: ' + datafile.studyId);

      study = Studies.findOne(datafile.studyId);

      if(study) {
        if(study.removeDuplicateIndices) {
          data = removeDuplicateIndices(data);
        }

        if(study.recordVisualIntakesOnly) {
          data = getVisualIntakesOnly(data);
        }

        processRecordings(data, datafile, job, callback);
      } else {
        console.log('no study found');
        job.fail('datafiles.noStudyFound');
        job.cancel();
        callback();
      }
    } else {
      console.log('already finished processing: ' + datafile._id);
      job.done();
      callback();
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


function processRecordings(cleanData, datafile, job, callback) {
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

  aois = Aois.find({studyId: datafile.studyId}).fetch();

  cleanData.forEach(function(row, ri) {
    aoiId = getAoiId(row, aois, datafile);

    row.aoiId = aoiId;
    row.studyId = datafile.studyId;
    row.datafileId = datafile._id;

    // console.log(row);
    // console.log(ri);

    Recordings.insert(row);
    //TODO only insert if unique when ignoring datafileId

    // omit recording status update for ~50% faster datafile processing
    // Datafiles.update({_id: datafile._id}, {
    //   $set: {
    //     "recordingsProcessed": ri + 1,
    //   },
    // });
  });

  Datafiles.update({_id: datafile._id}, {
    $set: {
      "processed": true,
      "processing": false,
    },
  });

  console.log('successfully finished processing datafile');

  job.done();
  callback();
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

export {
  renameHeaders,
  removeDuplicateIndices,
  getVisualIntakesOnly,
  getAoiId,
}
