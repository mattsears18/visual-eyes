import { makeDatafileStats } from './makeDatafileStats';
import { makeAoiStats } from '../Aois/makeAoiStats';
import Jobs from '../../../collections/Jobs/Jobs';
// fs = require('fs');
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

        // assume a single participant per datafile
        if(datafile.name.indexOf('.') > -1) {
          // has file extension
          participantName = datafile.name.replace(/\.[^/.]+$/, "")
        } else {
          //does not have file extension
          partitipantName = datafile.name;
        }

        //upsert isn't working so check for existing participant manually...
        existingParticipant = Participants.findOne({
          name: participantName,
          datafileId: datafile._id,
          studyId: study._id,
        });

        if(existingParticipant) {
          participantId = existingParticipant._id;
        } else {
          participantId = Participants.insert({
            name: participantName,
            datafileId: datafile._id,
            studyId: study._id,
          });
        }

        Studies.update({ _id: study._id }, { $set: { datafilesProcessing: true, datafilesProcessed: false }});

        datafile.studyId = study._id;
        datafile.participantId = participantId;

        Datafiles.update({ _id: datafile._id }, {
          $set: {
            studyId: datafile.studyId,
            participantId: participantId,
          }
        }, function(err, num) {
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
      csv({delimiter: "auto"})
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
      console.log('recording count - raw: ' + data.length);
      format = detectFormat(data);

      Datafiles.update({ _id: datafile._id }, { $set: { "format": format }});

      data = renameHeaders(data, format);

      console.log('studyId: ' + datafile.studyId);

      study = Studies.findOne(datafile.studyId);

      if(study) {
        if(study.recordVisualIntakesOnly) {
          data = getVisualIntakesOnly(data);
          console.log('recording count - visual intakes only: ' + data.length);
        }

        data = getStimuliOnly(data);
        console.log('recording count - recordings with stimuli only: ' + data.length);

        data = getNumericPositiveCoordinatesOnly(data);
        console.log('recording count - numeric only: ' + data.length);

        if(study.fixationsOnly) {
          data = getFixationsOnly(data);
          console.log('recording count - fixations only: ' + data.length);
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


function detectFormat(data) {
  row = data[0];

  if(row.hasOwnProperty('Point of Regard Binocular X [px]')) {
    return 'smi';
  } else if(row.hasOwnProperty('GazeX')) {
    return 'imotions';
  } else {
    console.log('No format detected! First row:');
    console.log(row);
  }
}


function renameHeaders(data, format) {
  console.log("rename headers using this format:");
  console.log(format);

  if(format == 'smi') {
    headers = [
      {'original': 'RecordingTime [ms]',                'new': 'recordingTime'},
      {'original': 'Time of Day [h:m:s:ms]',            'new': 'timeOfDay'},
      {'original': 'Category Binocular',                'new': 'category'},
      {'original': 'Index Binocular',                   'new': 'fixationIndex'},
      {'original': 'Point of Regard Binocular X [px]',  'new': 'x'},
      {'original': 'Point of Regard Binocular Y [px]',  'new': 'y'},
      {'original': 'Stimulus',                          'new': 'stimulusName'},
      {'original': 'AOI Name Binocular',                'new': 'aoiName'},
    ];
  } else if(format == 'imotions') {
    headers = [
      {'original': 'Timestamp',     'new': 'recordingTime'},
      {'original': 'FixationSeq',   'new': 'fixationIndex'},
      {'original': 'GazeX',         'new': 'x'},
      {'original': 'GazeY',         'new': 'y'},
      {'original': 'StimulusName',  'new': 'stimulusName'},
      {'original': 'GazeAOI',       'new': 'aoiName'},
    ];
  }

  cleanData = [];

  if(headers) {
    data.forEach(function(row, ri) {
      cleanRow = {};

      headers.forEach(function(header) {
        if(row.hasOwnProperty(header.original)) {
          cleanRow[header.new] = row[header.original];
        }
      });

      cleanData.push(cleanRow);
    });
  }

  return cleanData;
}

function getNumericPositiveCoordinatesOnly(data) {
  return data.filter(row => {
    return (
      Number.isInteger(parseInt(row.x)) &&
      Number.isInteger(parseInt(row.y)) &&
      parseInt(row.x) >= 0 &&
      parseInt(row.y) >= 0
    );
  });
}

function getFixationsOnly(data) {
  console.log('get fixations only');

  goodRows = [];
  indices = [];

  data.forEach(function(row) {
    if(Number.isInteger(parseInt(row.fixationIndex))){
      ref = row.fixationIndex + ', ' + row.aoiName;
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

  if(data[0].hasOwnProperty('category')) {
    return data.filter(row => row.category == 'Visual Intake');
  } else {
    return data;
  }
}


function getStimuliOnly(data) {
  console.log('get intakes with stimuli only');

  // remove any rows with ".avi" or "smiGlasses" in stimulusName
  return data.filter(function(row) {
    if(row.stimulusName.match(/\.avi|smiGlasses/)) {
      return false;
    } else {
      return true;
    }
  });
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
    row.participantId = datafile.participantId;

    Recordings.insert(row);
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
  if(row.aoiName == '') {
    row.aoiName = '-';
  }

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
  detectFormat,
  renameHeaders,
  getNumericPositiveCoordinatesOnly,
  getStimuliOnly,
  getVisualIntakesOnly,
  getFixationsOnly,
  getAoiId,
}
