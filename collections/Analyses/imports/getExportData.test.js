import '../../factories.test';
import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Analyses.getExportData()', () => {
  it('has no participants', () => {
    const analysis = Factory.create('analysis');
    expect(analysis.getExportData()).to.eql([]);
  });

  it('has a participant', () => {
    const visit = Factory.create('visitWithGazepoints');

    const expectedFields = [
      'link',
      'study',
      'pointsType',
      'analysis',
      'minVisitDuration',
      'maxVisitGapDuration',
      'participant',
      'stimulus',
      'visitNumber',
      'visitDuration',
      'stimulusWidth',
      'stimulusHeight',
      'stimulusArea',
      'visitStartTime',
      'visitEndTime',
      'gazepointCount',
      'gazepointFrequency',
      'fixationCount',
      'fixationFrequency',
      'fixationProportion',
    ];

    // expect(visit.analysis().getExportData().length).to.equal(1);
    expect(Object.keys(visit.analysis().getExportData()[0])).to.eql(
      expectedFields,
    );
  }).timeout(60000);

  it('has a period', () => {
    const visit = Factory.create('visitWithGazepoints');

    const expectedFields = [
      'link',
      'study',
      'pointsType',
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
      'averageCentroidVelocityY',
    ];

    expect(
      Object.keys(
        visit.analysis().getExportData({ period: 5000, timestep: 0 })[0],
      ),
    ).to.eql(expectedFields);
  }).timeout(60000);

  it('groups by participant', () => {
    const visit1 = Factory.create('visitWithGazepoints', { number: 1 });
    Factory.create('visitWithGazepoints', {
      studyId: visit1.studyId,
      analysisId: visit1.analysisId,
      participantId: visit1.participantId,
      stimulusId: visit1.stimulusId,
      number: 2,
    });
    Factory.create('visitWithGazepoints', {
      studyId: visit1.studyId,
      analysisId: visit1.analysisId,
      participantId: visit1.participantId,
      stimulusId: visit1.stimulusId,
      number: 3,
    });

    const expectedFields = [
      'link',
      'study',
      'pointsType',
      'analysis',
      'maxVisitGapDuration',
      'minVisitDuration',
      'period',
      'minTimestep',
      'includeIncomplete',
      'participant',
      'visitCount',
      'visitDurations',
      'visitDurationsMin',
      'visitDurationsMax',
      'visitDurationsSum',
      'visitDurationsMean',
      'visitDurationsMedian',
      'visitDurationsPerStimulus',
      'visitDurationsPerStimulusMin',
      'visitDurationsPerStimulusMax',
      'visitDurationsPerStimulusMean',
      'visitDurationsPerStimulusMedian',
      'visitCountsPerStimulus',
      'visitCountsPerStimulusMin',
      'visitCountsPerStimulusMax',
      'visitCountsPerStimulusMean',
      'visitCountsPerStimulusMedian',
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
      'averageCentroidVelocityY',
    ];

    expect(
      Object.keys(
        visit1.analysis().getExportData({
          period: 5000,
          timestep: 0,
          groupBy: 'participant',
        })[0],
      ),
    ).to.eql(expectedFields);
  }).timeout(60000);
});
