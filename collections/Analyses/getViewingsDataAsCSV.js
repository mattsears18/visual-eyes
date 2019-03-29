import { jStat } from 'jStat';

export default function getDataAsCSV() {
  let analysis = this;
  let viewings = Viewings.find({ 'analysisId' : analysis._id}).fetch();

  console.log(viewings);

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
      viewingStartTime: viewing.startTime,
      viewingEndTime: viewing.endTime,
      viewingDuration: viewing.duration,
      gazepointCount: viewing.gazepointCount,
      gazepointFrequency: viewing.gazepointFrequency,
      fixationCount: viewing.fixationCount,
      fixationFrequency: viewing.fixationFrequency,
      fixationProportion: viewing.fixationProportion(),
      slideHullCount: '',
      firstHullStartTime: '',
      lastHullEndTime: '',
      slideHullCoveragePerHull: '',
      slideHullDurationPerHull: '',
      slideHullDurationPerViewing: '',
      slideHullCoverageDurationPerHull: '',
      slideHullCoverageDurationPerViewing: '',
      averageSlideHullCoveragePerViewing: '',
    };

    data.push(viewingData);
  });

  return CSV.unparse(data);
}
