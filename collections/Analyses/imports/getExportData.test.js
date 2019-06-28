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
    const gaze = Factory.create('gazeWithGazepoints');

    const expectedFields = [
      'link',
      'study',
      'pointsType',
      'analysis',
      'gazeGap',
      'minGazeTime',
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
      'fixationProportion'
    ];

    // expect(gaze.analysis().getExportData().length).to.equal(1);
    expect(Object.keys(gaze.analysis().getExportData()[0])).to.eql(
      expectedFields
    );
  }).timeout(60000);

  it('has a period', () => {
    const gaze = Factory.create('gazeWithGazepoints');

    const expectedFields = [
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
    ];

    expect(
      Object.keys(
        gaze.analysis().getExportData({ period: 5000, timestep: 0 })[0]
      )
    ).to.eql(expectedFields);
  }).timeout(60000);

  it('groups by participant', () => {
    const gaze1 = Factory.create('gazeWithGazepoints', { number: 1 });
    const gaze2 = Factory.create('gazeWithGazepoints', {
      studyId: gaze1.studyId,
      analysisId: gaze1.analysisId,
      participantId: gaze1.participantId,
      stimulusId: gaze1.stimulusId,
      number: 2
    });
    const gaze3 = Factory.create('gazeWithGazepoints', {
      studyId: gaze1.studyId,
      analysisId: gaze1.analysisId,
      participantId: gaze1.participantId,
      stimulusId: gaze1.stimulusId,
      number: 3
    });

    const expectedFields = [
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
      'gazeCount',
      'gazeDurations',
      'gazeDurationsMin',
      'gazeDurationsMax',
      'gazeDurationsSum',
      'gazeDurationsMean',
      'gazeDurationsMedian',
      'gazeDurationsPerStimulus',
      'gazeDurationsPerStimulusMin',
      'gazeDurationsPerStimulusMax',
      'gazeDurationsPerStimulusMean',
      'gazeDurationsPerStimulusMedian',
      'gazeCountsPerStimulus',
      'gazeCountsPerStimulusMin',
      'gazeCountsPerStimulusMax',
      'gazeCountsPerStimulusMean',
      'gazeCountsPerStimulusMedian',
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
        gaze1.analysis().getExportData({
          period: 5000,
          timestep: 0,
          groupBy: 'participant'
        })[0]
      )
    ).to.eql(expectedFields);
  }).timeout(60000);
});
