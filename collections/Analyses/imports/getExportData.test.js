// import '../../factories.test';
// import { Factory } from 'meteor/dburles:factory';
// import { expect } from 'chai';
// import defaultTestFixations from '../../defaultTestFixations';

// describe('Analyses.getExportData()', () => {
//   it('has no participants', () => {
//     const analysis = Factory.create('analysis');
//     expect(analysis.getExportData()).to.eql([]);
//   });

//   it('has a participant', () => {
//     const visit = Factory.create('visit');

//     const expectedFields = [
//       'link',
//       'study',
//       'analysis',
//       'minVisitDuration',
//       'maxVisitGapDuration',
//       'participant',
//       'stimulus',
//       'visitNumber',
//       'visitDuration',
//       'stimulusWidth',
//       'stimulusHeight',
//       'stimulusArea',
//       'visitStartTime',
//       'visitEndTime',
//       'fixationCount',
//       'fixationFrequency',
//       // 'fixationProportion',
//     ];

//     expect(Object.keys(visit.analysis().getExportData()[0])).to.eql(
//       expectedFields,
//     );
//   });

//   it('has a period', () => {
//     const visit = Factory.create('visit', { fixations: defaultTestFixations });

//     const expectedFields = [
//       'link',
//       'study',
//       'analysis',
//       'minVisitDuration',
//       'maxVisitGapDuration',
//       'period',
//       'minTimestep',
//       'includeIncomplete',
//       'participant',
//       'stimulus',
//       'visitNumber',
//       'visitDuration',
//       'stimulusWidth',
//       'stimulusHeight',
//       'stimulusArea',
//       'visitStartTime',
//       'visitEndTime',
//       'fixationCount',
//       'fixationFrequency',
//       'averageCoverage',
//       'finalCoverage',
//       'averageVelocity',
//       'averageVelocityX',
//       'averageVelocityY',
//       'averageCentroidVelocity',
//       'averageCentroidVelocityX',
//       'averageCentroidVelocityY',
//     ];

//     expect(
//       Object.keys(
//         visit.analysis().getExportData({ period: 5000, timestep: 0 })[0],
//       ),
//     ).to.eql(expectedFields);
//   });

//   it('groups by participant', () => {
//     const visit1 = Factory.create('visit', {
//       number: 1,
//       fixations: defaultTestFixations,
//     });
//     Factory.create('visit', {
//       studyId: visit1.studyId,
//       analysisId: visit1.analysisId,
//       participantId: visit1.participantId,
//       stimulusId: visit1.stimulusId,
//       number: 2,
//       fixations: defaultTestFixations,
//     });
//     Factory.create('visit', {
//       studyId: visit1.studyId,
//       analysisId: visit1.analysisId,
//       participantId: visit1.participantId,
//       stimulusId: visit1.stimulusId,
//       number: 3,
//       fixations: defaultTestFixations,
//     });

//     const expectedFields = [
//       'link',
//       'study',
//       'analysis',
//       'maxVisitGapDuration',
//       'minVisitDuration',
//       'period',
//       'minTimestep',
//       'includeIncomplete',
//       'participant',
//       'visitCount',
//       'visitDurations',
//       'visitDurationsMin',
//       'visitDurationsMax',
//       'visitDurationsSum',
//       'visitDurationsMean',
//       'visitDurationsMedian',
//       'visitDurationsPerStimulus',
//       'visitDurationsPerStimulusMin',
//       'visitDurationsPerStimulusMax',
//       'visitDurationsPerStimulusMean',
//       'visitDurationsPerStimulusMedian',
//       'visitCountsPerStimulus',
//       'visitCountsPerStimulusMin',
//       'visitCountsPerStimulusMax',
//       'visitCountsPerStimulusMean',
//       'visitCountsPerStimulusMedian',
//       'fixationCount',
//       'fixationFrequency',
//       'averageCoverage',
//       'finalCoverages',
//       'finalCoveragesMin',
//       'finalCoveragesMax',
//       'finalCoveragesMean',
//       'finalCoveragesMedian',
//       'averageVelocity',
//       'averageVelocityX',
//       'averageVelocityY',
//       'averageCentroidVelocity',
//       'averageCentroidVelocityX',
//       'averageCentroidVelocityY',
//     ];

//     expect(
//       Object.keys(
//         visit1.analysis().getExportData({
//           period: 5000,
//           timestep: 0,
//           groupBy: 'participant',
//         })[0],
//       ),
//     ).to.eql(expectedFields);
//   });
// });
