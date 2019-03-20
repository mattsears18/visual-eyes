import { jStat } from 'jStat';

export default function getDataAsCSV() {
  let analysis = this;
  let participants = Participants.find({'_id': { $in: analysis.participantIds }}).fetch();

  let data = [];

  participants.forEach(function(participant) {
    let viewings = Viewings.find({'analysisId': analysis._id, 'participantId': participant._id}).fetch();
    let datafile = Datafiles.findOne({ _id: participant.datafileId });

    let viewingCounts = helpers.getViewingCounts(viewings);

    let viewingDurations = viewings.map(function(viewing) {
      return viewing.duration;
    });

    let averageSlideHullCoverages = viewings.map(function(viewing) {
      return viewing.averageSlideHullCoverage();
    });

    let participantData = {
      'analysisName': analysis.name,
      'analysisId': analysis._id,
      'period': analysis.period,
      'viewingGap': analysis.viewingGap,
      'minViewingTime': analysis.minViewingTime,
      'participantName': participant.name,
      'participantId': participant._id,
      'viewingCountPerStimulusMean': jStat.mean(viewingCounts),
      'viewingCountPerStimulusMedian': jStat.median(viewingCounts),
      'viewingCountTotal': jStat.sum(viewingCounts),
      'viewingDurationMean': jStat.mean(viewingDurations),
      'viewingDurationMedian': jStat.median(viewingDurations),
      'viewingDurationTotal': jStat.sum(viewingDurations),
      'averageConvexHullCoverageSlideMean': jStat.mean(averageSlideHullCoverages),
      'averageConvexHullCoverageSlideMedian': jStat.median(averageSlideHullCoverages),
      'rawRowCount': datafile.rawRowCount,
      'gazePointCount': datafile.gazePointCount,
      'gazePointProportion': (datafile.gazePointCount / datafile.rawRowCount),
      'nonDuplicateGazePointCount': datafile.nonDuplicateGazePointCount,
      'nonDuplicateGazePointProportion': (datafile.nonDuplicateGazePointCount / datafile.gazePointCount),
      'fixationCount': datafile.fixationCount,
      'fixationProportion': (datafile.fixationCount / datafile.gazePointCount),
      'fixationNonDuplicateProportion': (datafile.fixationCount / datafile.nonDuplicateGazePointCount),
    };

    participant.variables().forEach(function(variable){
      participantData[variable.name] = variable.value;
    });

    data.push(participantData);
  });

  return data;
}
