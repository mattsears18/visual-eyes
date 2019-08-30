import { jStat } from 'jStat';

export default function getExportData(opt) {
  const { groupBy } = opt || {};

  const visitData = [];

  const variableNames = this.study()
    .variables()
    .fetch()
    .map(variable => variable.name);

  this.visits().forEach((visit) => {
    const exportData = visit.getExportData(opt);

    const singleVisitData = {
      ..._.pick(exportData.length ? exportData[0] : exportData, [
        'link',
        'study',
        'analysis',
        'minVisitDuration',
        'maxVisitGapDuration',
        'period',
        'minTimestep',
        'includeIncomplete',
        'participant',
        'stimulus',
        'visitNumber',
        'visitDuration',
        'stimulusWidth',
        'stimulusHeight',
        'stimulusArea',
        'visitStartTime',
        'visitEndTime',
        'fixationCount',
        'fixationFrequency',
        'averageCoverage',
        'finalCoverage',
        'averageVelocity',
        'averageVelocityX',
        'averageVelocityY',
        'averageCentroidVelocity',
        'averageCentroidVelocityX',
        'averageCentroidVelocityY',
      ]),
    };

    visit
      .participant()
      .variables()
      .forEach(function(variable) {
        singleVisitData[variable.name] = variable.value;
      });

    visitData.push(singleVisitData);
  });

  if (groupBy === 'participant') {
    const groups = _.groupBy(visitData, 'participant');

    const participantData = [];

    Object.keys(groups).forEach((participantName) => {
      const pVisits = groups[participantName];
      let singleParticipantData = {
        ..._.pick(pVisits[0], [
          'link',
          'study',
          // 'pointsType',
          'analysis',
          'maxVisitGapDuration',
          'minVisitDuration',
          'period',
          'minTimestep',
          'includeIncomplete',
          'participant',
        ]),
      };

      const durations = pVisits.map(v => v.visitDuration);
      const finalCoverages = pVisits.map(v => v.finalCoverage);

      const sVisitGroups = _.groupBy(pVisits, 'stimulus');
      const visitDurationsPerStimulus = [];
      const visitCountsPerStimulus = [];

      Object.keys(sVisitGroups).forEach((stimulusName) => {
        visitDurationsPerStimulus.push(
          jStat.sum(sVisitGroups[stimulusName].map(v => v.visitDuration)),
        );

        visitCountsPerStimulus.push(sVisitGroups[stimulusName].length);
      });

      singleParticipantData = {
        ...singleParticipantData,
        visitCount: pVisits.length,
        visitDurations: JSON.stringify(durations)
          .substr(1)
          .substr(0, JSON.stringify(durations).length - 2),
        visitDurationsMin: jStat.min(durations),
        visitDurationsMax: jStat.max(durations),
        visitDurationsSum: jStat.sum(durations),
        visitDurationsMean: jStat.mean(durations),
        visitDurationsMedian: jStat.median(durations),
        visitDurationsPerStimulus: JSON.stringify(visitDurationsPerStimulus)
          .substr(1)
          .substr(0, JSON.stringify(visitDurationsPerStimulus).length - 2),
        visitDurationsPerStimulusMin:
          visitDurationsPerStimulus.length < 10
            ? 0
            : jStat.min(visitDurationsPerStimulus),
        visitDurationsPerStimulusMax: jStat.max(visitDurationsPerStimulus),
        visitDurationsPerStimulusMean: jStat.mean(visitDurationsPerStimulus),
        visitDurationsPerStimulusMedian: jStat.median(
          visitDurationsPerStimulus,
        ),
        visitCountsPerStimulus: JSON.stringify(visitCountsPerStimulus)
          .substr(1)
          .substr(0, JSON.stringify(visitCountsPerStimulus).length - 2),
        visitCountsPerStimulusMin:
          visitCountsPerStimulus.length < 10
            ? 0
            : jStat.min(visitCountsPerStimulus),
        visitCountsPerStimulusMax: jStat.max(visitCountsPerStimulus),
        visitCountsPerStimulusMean: jStat.mean(visitCountsPerStimulus),
        visitCountsPerStimulusMedian: jStat.median(visitCountsPerStimulus),
        // gazepointCount: jStat.sum(pVisits.map(v => v.gazepointCount)),
        // gazepointFrequency:
        //   jStat.sum(pVisits.map(v => v.gazepointCount)) / jStat.sum(durations),
        fixationCount: jStat.sum(pVisits.map(v => v.fixationCount)),
        fixationFrequency:
          jStat.sum(pVisits.map(v => v.fixationCount)) / jStat.sum(durations),
        // fixationProportion:
        //   jStat.sum(pVisits.map(v => v.fixationCount))
        //   / jStat.sum(pVisits.map(v => v.gazepointCount)),
        averageCoverage:
          jStat.sum(pVisits.map(v => v.visitDuration * v.averageCoverage))
          / jStat.sum(durations),
        finalCoverages: JSON.stringify(finalCoverages)
          .substr(1)
          .substr(0, JSON.stringify(finalCoverages).length - 2),
        finalCoveragesMin: jStat.min(finalCoverages),
        finalCoveragesMax: jStat.max(finalCoverages),
        finalCoveragesMean: jStat.mean(finalCoverages),
        finalCoveragesMedian: jStat.median(finalCoverages),
        averageVelocity:
          jStat.sum(pVisits.map(v => v.visitDuration * v.averageVelocity))
          / jStat.sum(durations),
        averageVelocityX:
          jStat.sum(pVisits.map(v => v.visitDuration * v.averageVelocityX))
          / jStat.sum(durations),
        averageVelocityY:
          jStat.sum(pVisits.map(v => v.visitDuration * v.averageVelocityY))
          / jStat.sum(durations),
        averageCentroidVelocity:
          jStat.sum(
            pVisits.map(v => v.visitDuration * v.averageCentroidVelocity),
          ) / jStat.sum(durations),
        averageCentroidVelocityX:
          jStat.sum(
            pVisits.map(v => v.visitDuration * v.averageCentroidVelocityX),
          ) / jStat.sum(durations),
        averageCentroidVelocityY:
          jStat.sum(
            pVisits.map(v => v.visitDuration * v.averageCentroidVelocityY),
          ) / jStat.sum(durations),
      };

      singleParticipantData = {
        ...singleParticipantData,
        ..._.pick(pVisits[0], variableNames),
      };

      participantData.push(singleParticipantData);
    });

    return participantData;
  }
  return visitData;
}
