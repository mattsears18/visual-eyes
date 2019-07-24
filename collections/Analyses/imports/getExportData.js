import { jStat } from 'jStat';

export default function getExportData(opt) {
  const { groupBy } = opt || {};

  const glanceData = [];

  const variableNames = this.study()
    .variables()
    .fetch()
    .map(variable => variable.name);

  this.glances().forEach(glance => {
    const exportData = glance.getExportData(opt);

    const singleGlanceData = {
      ..._.pick(exportData.length ? exportData[0] : exportData, [
        'link',
        'study',
        'pointsType',
        'analysis',
        'maxGlanceGapDuration',
        'minGlanceDuration',
        'period',
        'minTimestep',
        'includeIncomplete',
        'participant',
        'stimulus',
        'glanceNumber',
        'glanceDuration',
        'stimulusWidth',
        'stimulusHeight',
        'stimulusArea',
        'glanceStartTime',
        'glanceEndTime',
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

    glance
      .participant()
      .variables()
      .forEach(function(variable) {
        singleGlanceData[variable.name] = variable.value;
      });

    glanceData.push(singleGlanceData);
  });

  if (groupBy === 'participant') {
    const groups = _.groupBy(glanceData, 'participant');

    const participantData = [];

    Object.keys(groups).forEach(participantName => {
      const pGlances = groups[participantName];
      let singleParticipantData = {
        ..._.pick(pGlances[0], [
          'link',
          'study',
          'pointsType',
          'analysis',
          'maxGlanceGapDuration',
          'minGlanceDuration',
          'period',
          'minTimestep',
          'includeIncomplete',
          'participant'
        ])
      };

      const durations = pGlances.map(v => v.glanceDuration);
      const finalCoverages = pGlances.map(v => v.finalCoverage);

      const sGlanceGroups = _.groupBy(pGlances, 'stimulus');
      const glanceDurationsPerStimulus = [];
      const glanceCountsPerStimulus = [];

      Object.keys(sGlanceGroups).forEach(stimulusName => {
        glanceDurationsPerStimulus.push(
          jStat.sum(sGlanceGroups[stimulusName].map(v => v.glanceDuration))
        );

        glanceCountsPerStimulus.push(sGlanceGroups[stimulusName].length);
      });

      singleParticipantData = {
        ...singleParticipantData,
        glanceCount: pGlances.length,
        glanceDurations: JSON.stringify(durations)
          .substr(1)
          .substr(0, JSON.stringify(durations).length - 2),
        glanceDurationsMin: jStat.min(durations),
        glanceDurationsMax: jStat.max(durations),
        glanceDurationsSum: jStat.sum(durations),
        glanceDurationsMean: jStat.mean(durations),
        glanceDurationsMedian: jStat.median(durations),
        glanceDurationsPerStimulus: JSON.stringify(glanceDurationsPerStimulus)
          .substr(1)
          .substr(0, JSON.stringify(glanceDurationsPerStimulus).length - 2),
        glanceDurationsPerStimulusMin:
          glanceDurationsPerStimulus.length < 10
            ? 0
            : jStat.min(glanceDurationsPerStimulus),
        glanceDurationsPerStimulusMax: jStat.max(glanceDurationsPerStimulus),
        glanceDurationsPerStimulusMean: jStat.mean(
          glanceDurationsPerStimulus
        ),
        glanceDurationsPerStimulusMedian: jStat.median(
          glanceDurationsPerStimulus
        ),
        glanceCountsPerStimulus: JSON.stringify(glanceCountsPerStimulus)
          .substr(1)
          .substr(0, JSON.stringify(glanceCountsPerStimulus).length - 2),
        glanceCountsPerStimulusMin:
          glanceCountsPerStimulus.length < 10
            ? 0
            : jStat.min(glanceCountsPerStimulus),
        glanceCountsPerStimulusMax: jStat.max(glanceCountsPerStimulus),
        glanceCountsPerStimulusMean: jStat.mean(glanceCountsPerStimulus),
        glanceCountsPerStimulusMedian: jStat.median(glanceCountsPerStimulus),
        gazepointCount: jStat.sum(pGlances.map(v => v.gazepointCount)),
        gazepointFrequency:
          jStat.sum(pGlances.map(v => v.gazepointCount)) /
          jStat.sum(durations),
        fixationCount: jStat.sum(pGlances.map(v => v.fixationCount)),
        fixationFrequency:
          jStat.sum(pGlances.map(v => v.fixationCount)) / jStat.sum(durations),
        fixationProportion:
          jStat.sum(pGlances.map(v => v.fixationCount)) /
          jStat.sum(pGlances.map(v => v.gazepointCount)),
        averageCoverage:
          jStat.sum(pGlances.map(v => v.glanceDuration * v.averageCoverage)) /
          jStat.sum(durations),
        finalCoverages: JSON.stringify(finalCoverages)
          .substr(1)
          .substr(0, JSON.stringify(finalCoverages).length - 2),
        finalCoveragesMin: jStat.min(finalCoverages),
        finalCoveragesMax: jStat.max(finalCoverages),
        finalCoveragesMean: jStat.mean(finalCoverages),
        finalCoveragesMedian: jStat.median(finalCoverages),
        averageVelocity:
          jStat.sum(pGlances.map(v => v.glanceDuration * v.averageVelocity)) /
          jStat.sum(durations),
        averageVelocityX:
          jStat.sum(
            pGlances.map(v => v.glanceDuration * v.averageVelocityX)
          ) / jStat.sum(durations),
        averageVelocityY:
          jStat.sum(
            pGlances.map(v => v.glanceDuration * v.averageVelocityY)
          ) / jStat.sum(durations),
        averageCentroidVelocity:
          jStat.sum(
            pGlances.map(v => v.glanceDuration * v.averageCentroidVelocity)
          ) / jStat.sum(durations),
        averageCentroidVelocityX:
          jStat.sum(
            pGlances.map(v => v.glanceDuration * v.averageCentroidVelocityX)
          ) / jStat.sum(durations),
        averageCentroidVelocityY:
          jStat.sum(
            pGlances.map(v => v.glanceDuration * v.averageCentroidVelocityY)
          ) / jStat.sum(durations)
      };

      singleParticipantData = {
        ...singleParticipantData,
        ..._.pick(pGlances[0], variableNames)
      };

      participantData.push(singleParticipantData);
    });

    return participantData;
  }
  return glanceData;
}
