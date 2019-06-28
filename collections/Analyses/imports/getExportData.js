import { jStat } from 'jStat';

export default function getExportData(opt) {
  const { groupBy } = opt || {};

  const gazeData = [];

  const variableNames = this.study()
    .variables()
    .fetch()
    .map(variable => variable.name);

  this.gazes().forEach(gaze => {
    const exportData = gaze.getExportData(opt);

    const singleGazeData = {
      ..._.pick(exportData.length ? exportData[0] : exportData, [
        'link',
        'study',
        'pointsType',
        'analysis',
        'gazeGap',
        'minGazeTime',
        'period',
        'minTimestep',
        'includeIncomplete',
        'participant',
        'stimulus',
        'gazeNumber',
        'gazeDuration',
        'stimulusWidth',
        'stimulusHeight',
        'stimulusArea',
        'gazeStartTime',
        'gazeEndTime',
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

    gaze
      .participant()
      .variables()
      .forEach(function(variable) {
        singleGazeData[variable.name] = variable.value;
      });

    gazeData.push(singleGazeData);
  });

  if (groupBy === 'participant') {
    const groups = _.groupBy(gazeData, 'participant');

    const participantData = [];

    Object.keys(groups).forEach(participantName => {
      const pGazes = groups[participantName];
      let singleParticipantData = {
        ..._.pick(pGazes[0], [
          'link',
          'study',
          'pointsType',
          'analysis',
          'gazeGap',
          'minGazeTime',
          'period',
          'minTimestep',
          'includeIncomplete',
          'participant'
        ])
      };

      const durations = pGazes.map(v => v.gazeDuration);
      const finalCoverages = pGazes.map(v => v.finalCoverage);

      const sGazeGroups = _.groupBy(pGazes, 'stimulus');
      const gazeDurationsPerStimulus = [];
      const gazeCountsPerStimulus = [];

      Object.keys(sGazeGroups).forEach(stimulusName => {
        gazeDurationsPerStimulus.push(
          jStat.sum(sGazeGroups[stimulusName].map(v => v.gazeDuration))
        );

        gazeCountsPerStimulus.push(sGazeGroups[stimulusName].length);
      });

      singleParticipantData = {
        ...singleParticipantData,
        gazeCount: pGazes.length,
        gazeDurations: JSON.stringify(durations)
          .substr(1)
          .substr(0, JSON.stringify(durations).length - 2),
        gazeDurationsMin: jStat.min(durations),
        gazeDurationsMax: jStat.max(durations),
        gazeDurationsSum: jStat.sum(durations),
        gazeDurationsMean: jStat.mean(durations),
        gazeDurationsMedian: jStat.median(durations),
        gazeDurationsPerStimulus: JSON.stringify(gazeDurationsPerStimulus)
          .substr(1)
          .substr(0, JSON.stringify(gazeDurationsPerStimulus).length - 2),
        gazeDurationsPerStimulusMin:
          gazeDurationsPerStimulus.length < 10
            ? 0
            : jStat.min(gazeDurationsPerStimulus),
        gazeDurationsPerStimulusMax: jStat.max(gazeDurationsPerStimulus),
        gazeDurationsPerStimulusMean: jStat.mean(
          gazeDurationsPerStimulus
        ),
        gazeDurationsPerStimulusMedian: jStat.median(
          gazeDurationsPerStimulus
        ),
        gazeCountsPerStimulus: JSON.stringify(gazeCountsPerStimulus)
          .substr(1)
          .substr(0, JSON.stringify(gazeCountsPerStimulus).length - 2),
        gazeCountsPerStimulusMin:
          gazeCountsPerStimulus.length < 10
            ? 0
            : jStat.min(gazeCountsPerStimulus),
        gazeCountsPerStimulusMax: jStat.max(gazeCountsPerStimulus),
        gazeCountsPerStimulusMean: jStat.mean(gazeCountsPerStimulus),
        gazeCountsPerStimulusMedian: jStat.median(gazeCountsPerStimulus),
        gazepointCount: jStat.sum(pGazes.map(v => v.gazepointCount)),
        gazepointFrequency:
          jStat.sum(pGazes.map(v => v.gazepointCount)) /
          jStat.sum(durations),
        fixationCount: jStat.sum(pGazes.map(v => v.fixationCount)),
        fixationFrequency:
          jStat.sum(pGazes.map(v => v.fixationCount)) / jStat.sum(durations),
        fixationProportion:
          jStat.sum(pGazes.map(v => v.fixationCount)) /
          jStat.sum(pGazes.map(v => v.gazepointCount)),
        averageCoverage:
          jStat.sum(pGazes.map(v => v.gazeDuration * v.averageCoverage)) /
          jStat.sum(durations),
        finalCoverages: JSON.stringify(finalCoverages)
          .substr(1)
          .substr(0, JSON.stringify(finalCoverages).length - 2),
        finalCoveragesMin: jStat.min(finalCoverages),
        finalCoveragesMax: jStat.max(finalCoverages),
        finalCoveragesMean: jStat.mean(finalCoverages),
        finalCoveragesMedian: jStat.median(finalCoverages),
        averageVelocity:
          jStat.sum(pGazes.map(v => v.gazeDuration * v.averageVelocity)) /
          jStat.sum(durations),
        averageVelocityX:
          jStat.sum(
            pGazes.map(v => v.gazeDuration * v.averageVelocityX)
          ) / jStat.sum(durations),
        averageVelocityY:
          jStat.sum(
            pGazes.map(v => v.gazeDuration * v.averageVelocityY)
          ) / jStat.sum(durations),
        averageCentroidVelocity:
          jStat.sum(
            pGazes.map(v => v.gazeDuration * v.averageCentroidVelocity)
          ) / jStat.sum(durations),
        averageCentroidVelocityX:
          jStat.sum(
            pGazes.map(v => v.gazeDuration * v.averageCentroidVelocityX)
          ) / jStat.sum(durations),
        averageCentroidVelocityY:
          jStat.sum(
            pGazes.map(v => v.gazeDuration * v.averageCentroidVelocityY)
          ) / jStat.sum(durations)
      };

      singleParticipantData = {
        ...singleParticipantData,
        ..._.pick(pGazes[0], variableNames)
      };

      participantData.push(singleParticipantData);
    });

    return participantData;
  }
  return gazeData;
}
