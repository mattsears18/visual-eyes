// import '../../factories.test';
// import { Factory } from 'meteor/dburles:factory';
// import { expect } from 'chai';
// import defaultTestFixations from '../../defaultTestFixations';
// import idx from '../../../node_modules/idx/lib/idx';

// describe.only('Analyses.getExportData()', () => {
//   it('has no participants', () => {
//     const analysis = Factory.create('analysis');
//     expect(analysis.getExportData()).to.eql([]);
//   });

//   // it('has a participant', () => {
//   //   const visit = Factory.create('visit');

//   //   const expectedFields = [
//   //     'link',
//   //     'study',
//   //     'analysis',
//   //     'maxOffStimulusFixations',
//   //     'minVisitDuration',
//   //     'participant',
//   //     'visitNumber',
//   //     'stimulus',
//   //     'stimulusWidth',
//   //     'stimulusHeight',
//   //     'stimulusArea',
//   //     'aoi',
//   //     'visitTimestamp',
//   //     'visitTimestampEnd',
//   //     'visitDuration',
//   //     'fixationCount',
//   //     'fixationFrequency',
//   //   ];

//   //   expect(
//   //     Object.keys(
//   //       visit.analysis().getExportData({ groupBy: 'participant' })[0],
//   //     ),
//   //   ).to.eql(expectedFields);
//   // });

//   // it('has a period', () => {
//   //   const participant = Factory.create('participant');
//   //   const visit = Factory.create('visit', {
//   //     participantId: participant._id,
//   //     fixationIndices: [1, 2, 3, 4, 5],
//   //   });

//   //   defaultTestFixations.forEach((f) => {
//   //     const fixation = Factory.create('eyeevent', {
//   //       ...f,
//   //       participantId: participant._id,
//   //     });
//   //   });

//   //   // console.log(visit.getFixations().fetch());

//   //   const expectedFields = [
//   //     'link',
//   //     'study',
//   //     'analysis',
//   //     'minVisitDuration',
//   //     'maxOffStimulusFixations',
//   //     'period',
//   //     'minTimestep',
//   //     'includeIncomplete',
//   //     'participant',
//   //     'stimulus',
//   //     'visitNumber',
//   //     'visitDuration',
//   //     'stimulusWidth',
//   //     'stimulusHeight',
//   //     'stimulusArea',
//   //     'visitStartTime',
//   //     'visitEndTime',
//   //     'fixationCount',
//   //     'fixationFrequency',
//   //     'averageCoverage',
//   //     'finalCoverage',
//   //     'averageVelocity',
//   //     'averageVelocityX',
//   //     'averageVelocityY',
//   //     'averageCentroidVelocity',
//   //     'averageCentroidVelocityX',
//   //     'averageCentroidVelocityY',
//   //   ];

//   //   expect(
//   //     Object.keys(
//   //       visit.analysis().getExportData({ period: 5000, timestep: 0 })[0],
//   //     ),
//   //   ).to.eql(expectedFields);
//   // });

//   it('groups by participant', () => {
//     const visit1 = Factory.create('visit', {
//       number: 1,
//       fixationIndices: [1, 2, 3, 4, 5],
//     });
//     const visit2 = Factory.create('visit', {
//       studyId: visit1.studyId,
//       analysisId: visit1.analysisId,
//       participantId: visit1.participantId,
//       stimulusId: visit1.stimulusId,
//       number: 2,
//       fixationIndices: [7, 8, 9],
//     });
//     const visit3 = Factory.create('visit', {
//       studyId: visit1.studyId,
//       analysisId: visit1.analysisId,
//       participantId: visit1.participantId,
//       stimulusId: visit1.stimulusId,
//       number: 3,
//       fixationIndices: [10, 11, 12, 13, 14, 15],
//     });

//     defaultTestFixations.forEach(f => {
//       Factory.create('eyeevent', {
//         ...f,
//         studyId: visit1.studyId,
//         analysisId: visit1.analysisId,
//         participantId: visit1.participantId,
//         stimulusId: visit1.stimulusId,
//       });
//     });

//     const expectedFields = [
//       'link',
//       'study',
//       'analysis',
//       'maxOffStimulusFixations',
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

//     // console.log(
//     //   visit1.analysis().getExportData({
//     //     period: 5000,
//     //     timestep: 0,
//     //     groupBy: 'participant',
//     //   })[0],
//     // );

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
