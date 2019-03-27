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
      link: 'http://',
      study: '',
      analysis: analysis.name,
      period: analysis.period,
      viewingGap: analysis.viewingGap,
      minViewingTime: analysis.minViewingTime,
      participant: participant.name,
      viewingCountPerStimulusMean: jStat.mean(viewingCounts),
      viewingCountPerStimulusMedian: jStat.median(viewingCounts),
      viewingCountTotal: jStat.sum(viewingCounts),
      viewingDurationMean: jStat.mean(viewingDurations),
      viewingDurationMedian: jStat.median(viewingDurations),
      viewingDurationTotal: jStat.sum(viewingDurations),
      averageConvexHullCoverageSlideMean: jStat.mean(averageSlideHullCoverages),
      averageConvexHullCoverageSlideMedian: jStat.median(averageSlideHullCoverages),
      rawRowCount: jStat.sum(datafiles.map((datafile) => { return datafile.rawRowCount; })),
      gazepointCount: jStat.sum(datafiles.map((datafile) => { return datafile.gazepointCount; })),
      gazepointProportion: (
        jStat.sum(datafiles.map((datafile) => { return datafile.gazepointCount; })) /
        jStat.sum(datafiles.map((datafile) => { return datafile.rawRowCount; }))
      ),
      fixationCount: jStat.sum(datafiles.map((datafile) => { return datafile.fixationCount; })),
      fixationProportion: (
        jStat.sum(datafiles.map((datafile) => { return datafile.fixationCount; })) /
        jStat.sum(datafiles.map((datafile) => { return datafile.gazepointCount; }))
      ),
    };

    participant.variables().forEach(function(variable){
      participantData[variable.name] = variable.value;
    });

    data.push(participantData);
  });

  return CSV.unparse(data);
}
