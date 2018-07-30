export function makeViewings(analysisId) {
  console.log('make viewings');

  analysis = Analyses.findOne(analysisId);
  datafiles = Datafiles.find({ studyId: analysis.studyId });

  datafiles.forEach(function(datafile) {
    recordings = Recordings.find({ datafileId: datafile._id }, {sort: {recordingTime: 1}});

    console.log('recording count: ' + recordings.count());

    period = analysis.period;
    viewingGap = analysis.viewingGap;
    minViewingTime = analysis.minViewingTime;

    console.log('period: ' + period);
    console.log('viewingGap: ' + viewingGap);
    console.log('minViewingTime: ' + minViewingTime);

    recordings.forEach(function(recording) {
      // console.log(recording.recordingTime);
    });
  });
}
