import { jStat } from 'jStat';

export default function getCSVParticipants() {
  const analysis = this;
  const participants = Participants.find({
    _id: { $in: analysis.participantIds },
  }).fetch();

  const data = [];

  participants.forEach(function(participant) {
    const viewings = Viewings.find({
      analysisId: analysis._id,
      participantId: participant._id,
    }).fetch();
    const datafiles = Datafiles.find({ _id: { $in: participant.datafileIds } });

    const viewingCounts = helpers.getViewingCounts(viewings);

    const viewingDurations = viewings.map(function(viewing) {
      return viewing.duration;
    });

    const averageSlideHullCoverages = viewings.map(function(viewing) {
      return viewing.averageSlideHullCoverage;
    });

    const participantData = {
      link: `${Meteor.absoluteUrl()}studies/${
        analysis.study()._id
      }/participants/${participant._id}`,
      study: analysis.study().name,
      pointsType: analysis.study().pointsType(),
      analysis: analysis.name,
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
      rawRowCount: jStat.sum(datafiles.map(datafile => datafile.rawRowCount)),
      gazepointCount: jStat.sum(
        datafiles.map(datafile => datafile.gazepointCount),
      ),
      gazepointProportion:
        jStat.sum(datafiles.map(datafile => datafile.gazepointCount))
        / jStat.sum(datafiles.map(datafile => datafile.rawRowCount)),
      fixationCount: jStat.sum(
        datafiles.map(datafile => datafile.fixationCount),
      ),
      fixationProportion:
        jStat.sum(datafiles.map(datafile => datafile.fixationCount))
        / jStat.sum(datafiles.map(datafile => datafile.gazepointCount)),
    };

    participant.variables().forEach(function(variable) {
      participantData[variable.name] = variable.value;
    });

    data.push(participantData);
  });

  return CSV.unparse(data);
}
