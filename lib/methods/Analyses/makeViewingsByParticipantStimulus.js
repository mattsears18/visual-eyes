export default function makeViewingsByParticipantStimulus(analysis, stimulus, participant) {
  Viewings.remove({
    analysisId: analysis._id,
    stimulusId: stimulus._id,
    participantId: participant._id,
  });

  let number = 1;

  // console.log('ignoreOutsideImage: ' + analysis.ignoreOutsideImage);

  let search = { participantId: participant._id, stimulusId: stimulus._id };

  if(analysis.ignoreOutsideImage) {
    if(stimulus.width) {
      search.x = { $gte: 0, $lte: stimulus.width };
    } else {
      search.x = { $gte: 0 };
    }

    if(stimulus.height) {
      search.y = { $gte: 0, $lte: stimulus.height };
    } else {
      search.y = { $gte: 0 };
    }
  }

  let gazepoints = Gazepoints.find(search, {sort: {timestamp: 1}});

  // console.log('count: ' + gazepoints.count());
  // console.log('minViewingTime: ' + analysis.minViewingTime);
  // console.log('viewingGap: ' + analysis.viewingGap);
  // console.log('');

  let minViewingTime = analysis.minViewingTime;
  let viewingGap = analysis.viewingGap;

  // console.log(gazepoints);
  let gazepointsArr = gazepoints.fetch();

  let indices = [];
  let start = 0;
  let end = 0;
  let startTime = 0;
  let endTime = 0;
  let potentialEndTime = 0;
  let potentialStep = 0;

  gazepointsArr.forEach(function(gazepoint, ri) {
    // console.log(ri);
    // console.log('check for viewingGap');

    startTime = gazepointsArr[start].timestamp;
    endTime = gazepointsArr[end].timestamp;
    potentialEndTime = gazepoint.timestamp;
    potentialStep = potentialEndTime - endTime;

    // console.log('start: ' + start);
    // console.log('end: ' + end);
    // console.log('potential end: ' + ri);
    // console.log('viewingGap: ' + viewingGap);
    // console.log('start time: ' + startTime);
    // console.log('end time: ' + endTime);
    // console.log('potential end time: ' + potentialEndTime);
    // console.log('potential step: ' + potentialStep);

    // console.log('');
    // console.log('ri + 1: ' + (ri + 1));
    // console.log('count: ' + gazepoints.count());
    // console.log('');

    if(potentialStep < viewingGap) {
      //add current gazepoint to viewing set
      end = ri;

      if((ri + 1) == gazepointsArr.length) {
        // console.log('end of stimulus reached');
        checkMinTime();
      }
    } else {
      //viewing gap too large, check if minViewingTime reached
      // console.log('step too large, check if minimum viewing time acheived');
      checkMinTime();
    }
  });

  function checkMinTime() {
    let potentialTotalTime = endTime - startTime;
    // console.log('potential total time: ' + potentialTotalTime);

    if(potentialTotalTime > minViewingTime) {
      // console.log('minimum viewing time reached, add new viewing indices');
      // console.log('viewing indices: ' + '[' + start + ', ' + end + ']');
      indices.push({start: start, end: end});

      let gazepointIds = [];
      let gazepoints = [];
      let aoiIds = [];

      for(i = start; i <= end; i++) {
        // console.log('start: ' + start);
        // console.log('end: ' + end);
        // console.log(gazepointsArr[i]);
        // console.log('');
        gazepointIds.push(gazepointsArr[i]._id);
        if(!aoiIds.includes(gazepointsArr[i].aoiId)) {
          aoiIds.push(gazepointsArr[i].aoiId);
        }

        gazepoints.push({
          fixationIndex: gazepointsArr[i].fixationIndex,
          timestamp: gazepointsArr[i].timestamp,
          x: gazepointsArr[i].x,
          y: gazepointsArr[i].y,
        });
      }

      startTime = gazepointsArr[0].timestamp;
      endTime = gazepointsArr[gazepointsArr.length - 1].timestamp;
      let duration = endTime - startTime;
      let gazepointCount = gazepoints.length;
      let gazepointFrequency = gazepointCount / duration * 1000;
      let fixationCount = 18;
      let fixationFrequency = fixationCount / duration * 1000;

      Viewings.insert({
        studyId: analysis.studyId,
        analysisId: analysis._id,
        period: analysis.period,
        participantId: participant._id,
        stimulusId: stimulus._id,
        aoiIds: aoiIds,
        number: number,
        startTime: startTime,
        endTime: endTime,
        duration: duration,
        gazepointIds: gazepointIds,
        gazepoints: gazepoints,
        gazepointCount: gazepointCount,
        gazepointFrequency: gazepointFrequency,
        fixationCount: fixationCount,
        fixationFrequency: fixationFrequency,
      }, function(err, viewingId){
        if(err) {
          console.log(err);
        }
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
