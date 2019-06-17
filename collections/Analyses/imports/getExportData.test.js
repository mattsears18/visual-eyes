import '../../factories.test';
import { expect } from 'chai';
import { Factory } from 'meteor/dburles:factory';
import Analyses from '../Analyses';

describe('Analyses.getExportData()', () => {
  it('has no participants', () => {
    const analysis = Factory.create('analysis');
    expect(analysis.getExportData()).to.eql([]);
  });

  it('has a participant', () => {
    const viewing = Factory.create('viewingWithGazepoints');

    const expectedFields = [
      'link',
      'study',
      'pointsType',
      'analysis',
      'viewingGap',
      'minViewingTime',
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
      'fixationProportion'
    ];

    // expect(viewing.analysis().getExportData().length).to.equal(1);
    expect(Object.keys(viewing.analysis().getExportData()[0])).to.eql(
      expectedFields
    );
  }).timeout(60000);

  it('has a period', () => {
    const viewing = Factory.create('viewingWithGazepoints');

    const expectedFields = [
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
    ];

    expect(
      Object.keys(
        viewing.analysis().getExportData({ period: 5000, timestep: 0 })[0]
      )
    ).to.eql(expectedFields);
  }).timeout(60000);

  it('groups by participant', () => {
    const viewing1 = Factory.create('viewingWithGazepoints', { number: 1 });
    const viewing2 = Factory.create('viewingWithGazepoints', {
      studyId: viewing1.studyId,
      analysisId: viewing1.analysisId,
      participantId: viewing1.participantId,
      stimulusId: viewing1.stimulusId,
      number: 2
    });
    const viewing3 = Factory.create('viewingWithGazepoints', {
      studyId: viewing1.studyId,
      analysisId: viewing1.analysisId,
      participantId: viewing1.participantId,
      stimulusId: viewing1.stimulusId,
      number: 3
    });

    const expectedFields = [
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
      'viewingCount',
      'viewingDurations',
      'viewingDurationsMin',
      'viewingDurationsMax',
      'viewingDurationsSum',
      'viewingDurationsMean',
      'viewingDurationsMedian',
      'viewingDurationsPerStimulus',
      'viewingDurationsPerStimulusMin',
      'viewingDurationsPerStimulusMax',
      'viewingDurationsPerStimulusMean',
      'viewingDurationsPerStimulusMedian',
      'viewingCountsPerStimulus',
      'viewingCountsPerStimulusMin',
      'viewingCountsPerStimulusMax',
      'viewingCountsPerStimulusMean',
      'viewingCountsPerStimulusMedian',
      'gazepointCount',
      'gazepointFrequency',
      'fixationCount',
      'fixationFrequency',
      'fixationProportion',
      'averageCoverage',
      'finalCoverages',
      'finalCoveragesMin',
      'finalCoveragesMax',
      'finalCoveragesMean',
      'finalCoveragesMedian',
      'averageVelocity',
      'averageVelocityX',
      'averageVelocityY',
      'averageCentroidVelocity',
      'averageCentroidVelocityX',
      'averageCentroidVelocityY'
    ];

    expect(
      Object.keys(
        viewing1.analysis().getExportData({
          period: 5000,
          timestep: 0,
          groupBy: 'participant'
        })[0]
      )
    ).to.eql(expectedFields);
  }).timeout(60000);
});
