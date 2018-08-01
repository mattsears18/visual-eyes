export function makeViewings(analysisId) {
  console.log('make viewings');

  analysis = Analyses.findOne(analysisId);
  datafiles = Datafiles.find({ studyId: analysis.studyId });
  aois = Aois.find({ studyId: analysis.studyId });

  datafiles.forEach(function(datafile) {
    console.log('================================================================================')
    console.log('datafile: ' + datafile.name);

    aois.forEach(function(aoi) {
      console.log('================================================================================')
      console.log('aoi: ' + aoi.name);
      indices = makeViewingsByDatafileAoi(analysisId, datafile, aoi, analysis.minViewingTime, analysis.viewingGap);

      if(indices.length) {
        indices.forEach(function(ind) {
          console.log('start: ' + ind.start + ' end: ' + ind.end);
        });
      } else {
        console.log('no viewing indices created');
      }
    });
  });

  console.log('finished creating viewings');
  console.log('');
  //return viewings;
}

function makeViewingsByDatafileAoi(analysisId, datafile, aoi, minViewingTime, viewingGap) {
  number = 1;
  recordings = Recordings.find({ datafileId: datafile._id, aoiId: aoi._id }, {sort: {recordingTime: 1}});

  // console.log('recording count: ' + recordings.count());
  // console.log('minViewingTime: ' + minViewingTime);
  // console.log('viewingGap: ' + viewingGap);
  // console.log('');

  // console.log(recordings);
  recordingsArr = recordings.fetch();

  indices = [];
  start = 0;
  end = 0;

  recordingsArr.forEach(function(recording, ri) {
    // console.log(ri);
    // console.log('check for viewingGap');

    startTime = recordingsArr[start].recordingTime;
    endTime = recordingsArr[end].recordingTime;
    potentialEndTime = recording.recordingTime;
    potentialStep = potentialEndTime - endTime;

    // console.log('start: ' + start);
    // console.log('end: ' + end);
    // console.log('potential end: ' + ri);
    // console.log('viewingGap: ' + viewingGap);
    // console.log('start time: ' + startTime);
    // console.log('end time: ' + endTime);
    // console.log('potential end time: ' + potentialEndTime);
    // console.log('potential step: ' + potentialStep);
    //
    // console.log('');
    // console.log('ri + 1: ' + (ri + 1));
    // console.log('count: ' + recordings.count());
    // console.log('');

    if(potentialStep < viewingGap) {
      //add current recording to viewing set
      end = ri;

      if((ri + 1) == recordings.count()) {
        // console.log('end of file reached');
        checkMinTime();
      }
    } else {
      //viewing gap too large, check if minViewingTime reached
      // console.log('step too large, check if minimum viewing time acheived');
      checkMinTime();
    }
  });

  function checkMinTime() {
    potentialTotalTime = endTime - startTime;
    // console.log('potential total time: ' + potentialTotalTime);

    if(potentialTotalTime > minViewingTime) {
      // console.log('minimum viewing time reached, add new viewing indices');
      // console.log('viewing indices: ' + '[' + start + ', ' + end + ']');
      indices.push({start: start, end: end});
      Viewings.insert({
        analysisId: analysisId,
        datafileId: datafile._id,
        aoiId: aoi._id,
        number: number,
      });

      number++;
    } else {
      // console.log('duration too short, no new viewing');
    }

    // console.log('');

    end = end + 1;
    start = end;
  }

  return indices;
}
