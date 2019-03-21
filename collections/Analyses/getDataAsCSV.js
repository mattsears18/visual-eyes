import { jStat } from 'jStat';

export default function getDataAsCSV() {
  let analysis = this;
  let participants = Participants.find({'_id': { $in: analysis.participantIds }}).fetch();

  let data = [];

  participants.forEach(function(participant) {
    let viewings = Viewings.find({'analysisId': analysis._id, 'participantId': participant._id}).fetch();
    let datafiles = Datafiles.find({ _id: { $in: participant.datafileIds }});
    
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
      'rawRowCount': jStat.sum(datafiles.map((datafile) => { return datafile.rawRowCount; })),
      'gazePointCount': jStat.sum(datafiles.map((datafile) => { return datafile.gazePointCount; })),
      'gazePointProportion': (
        jStat.sum(datafiles.map((datafile) => { return datafile.rawRowCount; })) /
        jStat.sum(datafiles.map((datafile) => { return datafile.gazePointCount; }))
      ),
      'nonDuplicateGazePointCount': jStat.sum(datafiles.map((datafile) => { return datafile.nonDuplicateGazePointCount; })),
      'nonDuplicateGazePointProportion': (
        jStat.sum(datafiles.map((datafile) => { return datafile.nonDuplicateGazePointCount; })) /
        jStat.sum(datafiles.map((datafile) => { return datafile.gazePointCount; }))
      ),
      'fixationCount': jStat.sum(datafiles.map((datafile) => { return datafile.fixationCount; })),
      'fixationProportion': (
        jStat.sum(datafiles.map((datafile) => { return datafile.fixationCount; })) /
        jStat.sum(datafiles.map((datafile) => { return datafile.gazePointCount; }))
      ),
      'fixationNonDuplicateProportion': (
        jStat.sum(datafiles.map((datafile) => { return datafile.fixationCount; })) /
        jStat.sum(datafiles.map((datafile) => { return datafile.nonDuplicateGazePointCount; }))
      ),
    };

    participant.variables().forEach(function(variable){
      participantData[variable.name] = variable.value;
    });

    data.push(participantData);
  });

  return data;
}
