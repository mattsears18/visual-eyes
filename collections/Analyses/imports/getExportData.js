import { jStat } from 'jStat';

export default function getExportData(opt) {
  const { groupBy } = opt || {};

  const viewingData = [];

  const variableNames = this.study()
    .variables()
    .fetch()
    .map(variable => variable.name);

  this.viewings().forEach(viewing => {
    const exportData = viewing.getExportData(opt);

    const singleViewingData = {
      ..._.pick(exportData.length ? exportData[0] : exportData, [
        'link',
        'study',
        'pointsType',
        'analysis',
        'viewingGap',
        'minViewingTime',
        'period',
        'minTimestep',
        'includeIncomplete',
        'participant',
        'stimulus',
        'viewingNumber',
        'viewingDuration',
        'stimulusWidth',
        'stimulusHeight',
        'stimulusArea',
        'viewingStartTime',
        'viewingEndTime',
        'gazepointCount',
        'gazepointFrequency',
        'fixationCount',
        'fixationFrequency',
        'fixationProportion',
        'averageCoverage',
        'finalCoverage',
        'averageVelocity',
        'averageVelocityX',
        'averageVelocityY',
        'averageCentroidVelocity',
        'averageCentroidVelocityX',
        'averageCentroidVelocityY'
      ])
    };

    viewing
      .participant()
      .variables()
      .forEach(function(variable) {
        singleViewingData[variable.name] = variable.value;
      });

    viewingData.push(singleViewingData);
  });

  if (groupBy === 'participant') {
    const groups = _.groupBy(viewingData, 'participant');

    const participantData = [];

    Object.keys(groups).forEach(participantName => {
      const pViewings = groups[participantName];
      let singleParticipantData = {
        ..._.pick(pViewings[0], [
          'link',
          'study',
          'pointsType',
          'analysis',
          'viewingGap',
          'minViewingTime',
          'period',
          'minTimestep',
          'includeIncomplete',
          'participant'
        ])
      };

      const durations = pViewings.map(v => v.viewingDuration);
      const finalCoverages = pViewings.map(v => v.finalCoverage);

      const sViewingGroups = _.groupBy(pViewings, 'stimulus');
      const viewingDurationsPerStimulus = [];
      const viewingCountsPerStimulus = [];

      Object.keys(sViewingGroups).forEach(stimulusName => {
        viewingDurationsPerStimulus.push(
          jStat.sum(sViewingGroups[stimulusName].map(v => v.viewingDuration))
        );

        viewingCountsPerStimulus.push(sViewingGroups[stimulusName].length);
      });

      singleParticipantData = {
        ...singleParticipantData,
        viewingCount: pViewings.length,
        viewingDurations: JSON.stringify(durations)
          .substr(1)
          .substr(0, JSON.stringify(durations).length - 2),
        viewingDurationsMin: jStat.min(durations),
        viewingDurationsMax: jStat.max(durations),
        viewingDurationsSum: jStat.sum(durations),
        viewingDurationsMean: jStat.mean(durations),
        viewingDurationsMedian: jStat.median(durations),
        viewingDurationsPerStimulus: JSON.stringify(viewingDurationsPerStimulus)
          .substr(1)
          .substr(0, JSON.stringify(viewingDurationsPerStimulus).length - 2),
        viewingDurationsPerStimulusMin:
          viewingDurationsPerStimulus.length < 10
            ? 0
            : jStat.min(viewingDurationsPerStimulus),
        viewingDurationsPerStimulusMax: jStat.max(viewingDurationsPerStimulus),
        viewingDurationsPerStimulusMean: jStat.mean(
          viewingDurationsPerStimulus
        ),
        viewingDurationsPerStimulusMedian: jStat.median(
          viewingDurationsPerStimulus
        ),
        viewingCountsPerStimulus: JSON.stringify(viewingCountsPerStimulus)
          .substr(1)
          .substr(0, JSON.stringify(viewingCountsPerStimulus).length - 2),
        viewingCountsPerStimulusMin:
          viewingCountsPerStimulus.length < 10
            ? 0
            : jStat.min(viewingCountsPerStimulus),
        viewingCountsPerStimulusMax: jStat.max(viewingCountsPerStimulus),
        viewingCountsPerStimulusMean: jStat.mean(viewingCountsPerStimulus),
        viewingCountsPerStimulusMedian: jStat.median(viewingCountsPerStimulus),
        gazepointCount: jStat.sum(pViewings.map(v => v.gazepointCount)),
        gazepointFrequency:
          jStat.sum(pViewings.map(v => v.gazepointCount)) /
          jStat.sum(durations),
        fixationCount: jStat.sum(pViewings.map(v => v.fixationCount)),
        fixationFrequency:
          jStat.sum(pViewings.map(v => v.fixationCount)) / jStat.sum(durations),
        fixationProportion:
          jStat.sum(pViewings.map(v => v.fixationCount)) /
          jStat.sum(pViewings.map(v => v.gazepointCount)),
        averageCoverage:
          jStat.sum(pViewings.map(v => v.viewingDuration * v.averageCoverage)) /
          jStat.sum(durations),
        finalCoverages: JSON.stringify(finalCoverages)
          .substr(1)
          .substr(0, JSON.stringify(finalCoverages).length - 2),
        finalCoveragesMin: jStat.min(finalCoverages),
        finalCoveragesMax: jStat.max(finalCoverages),
        finalCoveragesMean: jStat.mean(finalCoverages),
        finalCoveragesMedian: jStat.median(finalCoverages),
        averageVelocity:
          jStat.sum(pViewings.map(v => v.viewingDuration * v.averageVelocity)) /
          jStat.sum(durations),
        averageVelocityX:
          jStat.sum(
            pViewings.map(v => v.viewingDuration * v.averageVelocityX)
          ) / jStat.sum(durations),
        averageVelocityY:
          jStat.sum(
            pViewings.map(v => v.viewingDuration * v.averageVelocityY)
          ) / jStat.sum(durations),
        averageCentroidVelocity:
          jStat.sum(
            pViewings.map(v => v.viewingDuration * v.averageCentroidVelocity)
          ) / jStat.sum(durations),
        averageCentroidVelocityX:
          jStat.sum(
            pViewings.map(v => v.viewingDuration * v.averageCentroidVelocityX)
          ) / jStat.sum(durations),
        averageCentroidVelocityY:
          jStat.sum(
            pViewings.map(v => v.viewingDuration * v.averageCentroidVelocityY)
          ) / jStat.sum(durations)
      };

      singleParticipantData = {
        ...singleParticipantData,
        ..._.pick(pViewings[0], variableNames)
      };

      participantData.push(singleParticipantData);
    });

    return participantData;
  }
  return viewingData;
}
