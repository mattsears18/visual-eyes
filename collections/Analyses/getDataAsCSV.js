import { jStat } from 'jStat';

export default function getDataAsCSV() {
  analysis = this;
  participants = Participants.find({"_id": { $in: analysis.participantIds }}).fetch();

  data = [];

  participants.forEach(function(participant) {
    viewings = Viewings.find({"analysisId": analysis._id, "participantId": participant._id}).fetch();

    viewingCounts = helpers.getViewingCounts(viewings);

    viewingDurations = viewings.map(function(viewing) {
      return viewing.duration;
    });

    averageSlideHullSizes = viewings.map(function(viewing) {
      return viewing.averageSlideHullSize;
    });

    participantData = {
      "analysisName": analysis.name,
      "analysisId": analysis._id,
      "period": analysis.period,
      "viewingGap": analysis.viewingGap,
      "minViewingTime": analysis.minViewingTime,
      "participantName": participant.name,
      "participantId": participant._id,
      "viewingCountPerAOIMean": jStat.mean(viewingCounts),
      "viewingCountPerAOIMedian": jStat.median(viewingCounts),
      "viewingCountTotal": jStat.sum(viewingCounts),
      "viewingDurationMean": jStat.mean(viewingDurations),
      "viewingDurationMedian": jStat.median(viewingDurations),
      "viewingDurationTotal": jStat.sum(viewingDurations),
      "averageConvexHullSizeSlideMean": jStat.mean(averageSlideHullSizes),
      "averageConvexHullSizeSlideMedian": jStat.median(averageSlideHullSizes),
    };

    participant.variables().forEach(function(variable){
      participantData[variable.name] = variable.value;
    });

    data.push(participantData);
  });

  return data;
}
