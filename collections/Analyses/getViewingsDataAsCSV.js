import { jStat } from 'jStat';

export default function getDataAsCSV() {
  let analysis = this;
  let viewings = Viewings.find({ 'analysisId' : analysis._id}).fetch();

  let data = [];

  viewings.forEach(function(viewing) {
    let viewingData = {
      link: Meteor.absoluteUrl() + 'studies/' + analysis.study()._id + '/viewings/' + viewing._id,
      study: analysis.study().name,
      analysis: analysis.name,
      period: analysis.period,
      viewingGap: analysis.viewingGap,
      minViewingTime: analysis.minViewingTime,
      participant: viewing.participant().name,
      stimulus: viewing.stimulus().name,
      viewingNumber: viewing.number,
      stimulusWidth: viewing.stimulus().width,
      stimulusHeight: viewing.stimulus().height,
      stimulusArea: viewing.stimulus().area(),
      viewingStartTime: viewing.minRecordingTime,
      viewingEndTime: viewing.maxRecordingTime,
      viewingDuration: viewing.duration,
      gazePointCount: '',
      gazePointFrequency: '',
      fixationCount: '',
      fixationFrequency: '',
      fixationProportion: '',
      slideHullCount: '',
      firstHullStartTime: '',
      lastHullEndTime: '',
      slideHullAreas: '',
      slideHullCoverages: '',
      slideHullDurations: '',
      slideHullDurationTotal: '',
      slideHullAreaDurations: '',
      slideHullAreaDurationTotal: '',
      slideHullCoverageDurations: '',
      slideHullCoverageDurationTotal: '',
      averageSlideHullArea: '',
      averageSlideHullCoverage: '',

      // 'viewingDurationMean': jStat.mean(viewingDurations),
      // 'viewingDurationMedian': jStat.median(viewingDurations),
      // 'viewingDurationTotal': jStat.sum(viewingDurations),
      // 'averageConvexHullCoverageSlideMean': jStat.mean(averageSlideHullCoverages),
      // 'averageConvexHullCoverageSlideMedian': jStat.median(averageSlideHullCoverages),
      // 'rawRowCount': jStat.sum(datafiles.map((datafile) => { return datafile.rawRowCount; })),
      // 'gazePointCount': jStat.sum(datafiles.map((datafile) => { return datafile.gazePointCount; })),
      // 'gazePointProportion': (
      //   jStat.sum(datafiles.map((datafile) => { return datafile.rawRowCount; })) /
      //   jStat.sum(datafiles.map((datafile) => { return datafile.gazePointCount; }))
      // ),
      // 'nonDuplicateGazePointCount': jStat.sum(datafiles.map((datafile) => { return datafile.nonDuplicateGazePointCount; })),
      // 'nonDuplicateGazePointProportion': (
      //   jStat.sum(datafiles.map((datafile) => { return datafile.nonDuplicateGazePointCount; })) /
      //   jStat.sum(datafiles.map((datafile) => { return datafile.gazePointCount; }))
      // ),
      // 'fixationCount': jStat.sum(datafiles.map((datafile) => { return datafile.fixationCount; })),
      // 'fixationProportion': (
      //   jStat.sum(datafiles.map((datafile) => { return datafile.fixationCount; })) /
      //   jStat.sum(datafiles.map((datafile) => { return datafile.gazePointCount; }))
      // ),
      // 'fixationNonDuplicateProportion': (
      //   jStat.sum(datafiles.map((datafile) => { return datafile.fixationCount; })) /
      //   jStat.sum(datafiles.map((datafile) => { return datafile.nonDuplicateGazePointCount; }))
      // ),
    };

    // participant.variables().forEach(function(variable){
    //   participantData[variable.name] = variable.value;
    // });

    data.push(viewingData);
  });

  return CSV.unparse(data);
}
