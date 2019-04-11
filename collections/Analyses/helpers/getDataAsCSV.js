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
      return viewing.averageSlideHullCoverage;
    });

    let participantData = {
      link: Meteor.absoluteUrl() + 'studies/' + analysis.study()._id + '/participants/' + participant._id,
      study: analysis.study().name,
      pointsType: analysis.study().pointsType(),
      analysis: analysis.name,
      period: analysis.period,
      viewingGap: analysis.viewingGap,
      minViewingTime: analysis.minViewingTime,
      participant: participant.name,
      viewingCountPerStimulus: viewingCounts,
      viewingCountPerStimulusMean: jStat.mean(viewingCounts),
      viewingCountPerStimulusMedian: jStat.median(viewingCounts),
      viewingCountPerParticipant: jStat.sum(viewingCounts),
      viewingDurationPerStimulus: viewingDurations,
      viewingDurationPerStimulusMean: jStat.mean(viewingDurations),
      viewingDurationPerStimulusMedian: jStat.median(viewingDurations),
      viewingDurationPerParticipant: jStat.sum(viewingDurations),
      slideHullCoveragePerStimulus: averageSlideHullCoverages,
      slideHullCoveragePerStimulusMean: jStat.mean(averageSlideHullCoverages),
      slideHullCoveragePerStimulusMedian: jStat.median(averageSlideHullCoverages),
      slideHullCoveragePerParticipant: '',
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
