import { makeDatafileStats } from './makeDatafileStats';
import { makeAoiStats } from '../Aois/makeAoiStats';
import Jobs from '../../../collections/Jobs/Jobs';
const csv = require('csvtojson');

Meteor.methods({
  'datafiles.process'({ jobDoc, callback }) {
    let job = Jobs.getJob(jobDoc._doc._id);

    let datafileId = job._doc.data.datafileId;
    let datafile = Datafiles.findOne({ _id: datafileId });
    if(!datafile) {
      console.log('datafile._id: ' + datafileId + ' NOT FOUND');
      job.fail('datafiles.datafileDoesNotExist');
      job.cancel();
      callback();
      return;
    }

    console.log('datafile._id: ' + datafile._id + ' FOUND');

    if(datafile.status == 'unrecognizedFileFormat') {
      job.fail("unrecognized file format");
      job.cancel();
      callback();
      return;
    }

    let study = Studies.findOne({ _id: datafile.studyId });
    if(!study) {
      console.log('datafile does not have a study!');
      job.fail('datafiles.noStudy');
      job.cancel();
      callback();
      return;
    }

    console.log('datafile has a study: ' + study._id);
    console.log('================================================================================');

    // check if headers have been remove from the datafile yet
    if(!datafile.headersRemoved) {
      Meteor.call('datafiles.removeHeadersDetectFormat', { datafileId: datafile._id });

      console.log("headers not removed yet");
      job.fail("Headers not removed yet");
      callback();
      return;
    }

    let participantName;
    // assume a single participant per datafile
    if(datafile.name.indexOf('.') > -1) {
      // has file extension
      participantName = datafile.name.replace(/\.[^/.]+$/, "")
    } else {
      //does not have file extension
      partitipantName = datafile.name;
    }

    //upsert isn't working so check for existing participant manually...
    let existingParticipant = Participants.findOne({
      name: participantName,
      studyId: datafile.studyId,
    });

    let participantId;

    if(existingParticipant) {
      participantId = existingParticipant._id;
      Participants.update({ _id: existingParticipant._id },
        { $push : { datafileIds: datafile._id }}
      );
    } else {
      participantId = Participants.insert({
        name: participantName,
        datafileIds: [datafile._id],
        studyId: datafile.studyId,
      });
    }

    datafile.participantId = participantId;

    Datafiles.update({ _id: datafile._id }, {
      $set: {
        participantId: participantId,
      }
    }, function(err, num) {
      if(err) {
        console.log(err.error);
        job.fail();
        callback();
      } else {
        preProcessDatafile(datafile, job, callback);
      }
    });
  }
});

function preProcessDatafile(datafile, job, callback) {
  if(datafile.status == 'processed') {
    console.log('already processed: ' + datafile._id);
    job.done();
    callback();
    return;
  }

  console.log('begin preprocessing datafile');

  datafile.status = 'preprocessing';
  datafile.recordingsProcessed = 0;

  Datafiles.update({ _id: datafile._id }, { $set: {
    "status": "preprocessing",
    "recordingsProcessed": 0,
  }});

  if(!datafile.recordings || !datafile.recordingsProcessed || (datafile.recordings != datafile.recordingsProcessed)) {
    csv({delimiter: "auto"})
      .fromFile(datafile.path)
      .then(Meteor.bindEnvironment((results) => {
        preprocessResults(results, datafile, job, callback);
      }));
  }
}


function preprocessResults(results, datafile, job, callback) {
  console.log('begin preprocessing results');
  let data = results;
  console.log('recording count - raw: ' + data.length);
  Datafiles.collection.update({ _id: datafile._id }, { $set: { rawRowCount: data.length }});

  data = renameHeaders(data, datafile.fileFormat);

  console.log('studyId: ' + datafile.studyId);
  study = Studies.findOne(datafile.studyId);
  if(!study) {
    console.log('no study found');
    job.fail('datafiles.noStudyFound');
    job.cancel();
    callback();
    return;
  }

  data = getNumericPositiveCoordinatesOnly(data);
  console.log('recording count - numeric only: ' + data.length);

  data = getVisualIntakesOnly(data);
  console.log('recording count - visual intakes only: ' + data.length);

  let gazePoints = getStimuliOnly(data);
  console.log('gazePoint count: ' + gazePoints.length);
  Datafiles.update({ _id: datafile._id }, { $set: { gazePointCount: gazePoints.length }});

  let nonDuplicateGazePoints = getNonDuplicateCoordinatesInly(gazePoints);
  console.log('non-duplicate gaze point Count: ' + nonDuplicateGazePoints.length);
  Datafiles.update({ _id: datafile._id }, { $set: { nonDuplicateGazePointCount: nonDuplicateGazePoints.length }});

  let fixations = getFixationsOnly(nonDuplicateGazePoints);
  console.log('fixation count: ' + fixations.length);
  Datafiles.update({ _id: datafile._id }, { $set: { fixationCount: fixations.length }});

  if(study.fixationsOnly) {
    data = fixations;
  } else {
    data = nonDuplicateGazePoints;
  }

  processRecordings(data, datafile, job, callback);
}


function renameHeaders(data, format) {
  console.log("rename headers using " + format + " format");

  let headers;

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

  let cleanData = [];

  if(headers) {
    data.forEach(function(row, ri) {
      let cleanRow = {};

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

  let goodRows = [];
  let indices = [];

  data.forEach(function(row) {
    if(Number.isInteger(parseInt(row.fixationIndex))){
      let ref = row.fixationIndex + ', ' + row.aoiName;
      if(!indices.includes(ref)) {
        indices.push(ref);
        goodRows.push(row);
      }
    }
  });

  return goodRows;
}

function getNonDuplicateCoordinatesInly(data) {
  let i = 0;
  while(i < data.length - 1) {
    if(
      (parseInt(data[i].x) == parseInt(data[i + 1].x)) &&
      (parseInt(data[i].y) == parseInt(data[i + 1].y)) &&
      (data[i].stimulusName == data[i + 1].stimulusName) &&
      (data[i].aoiName == data[i + 1].aoiName)
    ) {
      data.splice(i + 1, 1); // remove the following duplicate point;
    } else {
      i++;
    }
  }

  return data;
}

function getVisualIntakesOnly(data) {
  console.log('get visual intakes only');

  if(data && data[0] && data[0].hasOwnProperty('category')) {
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

  datafile.status = 'processing';

  Datafiles.update({_id: datafile._id}, {
    $set: {
      "status": "processing",
      "recordings": cleanData.length,
      "recordingsProcessed": 0,
    },
  });

  let stimuli = [];
  let stimuliCount = Stimuli.find({ studyId: datafile.studyId }).count();

  if(stimuliCount > 0) {
    stimuli = Stimuli.find({ studyId: datafile.studyId }).fetch();
  }

  let aois = Aois.find({studyId: datafile.studyId }).fetch();

  cleanData.forEach(function(row, ri) {
    let stimulusId = getStimulusId(row, stimuli, datafile);
    let aoiId = getAoiId(row, aois, datafile, stimulusId);

    row.studyId = datafile.studyId;
    row.participantId = datafile.participantId;
    row.stimulusId = stimulusId;
    row.aoiId = aoiId;

    Recordings.insert(row);
  });

  Datafiles.update({_id: datafile._id}, {
    $set: {
      "status": "processed",
    },
  });

  console.log('successfully finished processing datafile');

  let study = Studies.findOne({ _id: datafile.studyId });

  // console.log('');
  // console.log('datafiles count: ' + study.datafilesCount());
  // console.log('datafiles processed count: ' + study.datafilesProcessedCount());
  // console.log('datafiles processing complete: ' + study.datafilesProcessingComplete());
  // console.log('');

  if(study.datafilesProcessingComplete()) {
    if(Meteor.isServer) {
      Meteor.call('studies.reprocessAnalyses', { studyId: datafile.studyId });
    }
  }

  job.done();
  callback();
}


function getStimulusId(row, stimuli, datafile) {
  if(row.stimulusName) {
    let stimulus;
    let stimulusId;

    if(stimuli && stimuli.length) {
      stimulus = stimuli.find(function(stimulus) {
        return stimulus.name == row.stimulusName;
      });
    }

    if(stimulus) {
      stimulusId = stimulus._id;
      Stimuli.update({ _id: stimulusId }, {
        $addToSet: {
          datafileIds: datafile._id,
        },
      });
    } else {
      let newStimulusId = Stimuli.insert({
        name: row.stimulusName,
        studyId: datafile.studyId,
        datafileIds: [datafile._id],
      });

      stimuli.push({'name': row.stimulusName, '_id': newStimulusId});

      stimulusId = newStimulusId;
    }

    return stimulusId;
  }
}


function getAoiId(row, aois, datafile, stimulusId) {
  if(row.aoiName == '') {
    row.aoiName = '-';
  }

  let aoi;
  let aoiId;

  if(aois && aois.length) {
    aoi = aois.find(function(aoi) {
      return (aoi.stimulusId == stimulusId && aoi.name == row.aoiName);
    });
  }

  if(aoi) {
    aoiId = aoi._id;
  } else {
    let newAoiId = Aois.insert({
      name: row.aoiName,
      studyId: datafile.studyId,
      stimulusId: stimulusId,
    });

    aois.push({ 'name': row.aoiName, '_id': newAoiId, 'stimulusId': stimulusId });
    aoiId = newAoiId;
  }

  return aoiId;
}

export {
  renameHeaders,
  getNumericPositiveCoordinatesOnly,
  getStimuliOnly,
  getVisualIntakesOnly,
  getFixationsOnly,
  getStimulusId,
  getAoiId,
}
