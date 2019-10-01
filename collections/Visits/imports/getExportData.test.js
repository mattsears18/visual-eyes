import '../../factories.test';

import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';
import defaultTestFixations from '../../defaultTestFixations';

describe('Visit.getExportData()', () => {
  it('has no period', () => {
    const visit = Factory.create('visit');
    const expectedFields = [
      'link',
      'study',
      'analysis',
      'maxFixationGap',
      'minVisitDuration',
      'participant',
      'visitNumber',
      'stimulus',
      'stimulusWidth',
      'stimulusHeight',
      'stimulusArea',
      'aoi',
      'visitDuration',
      'visitTimestamp',
      'visitTimestampEnd',
      'fixationCount',
      'fixationFrequency',
    ];

    expect(Object.keys(visit.getExportData())).to.eql(expectedFields);
  });

  // TODO
  // it('has a period', () => {
  //   const visit = Factory.create('visit', { fixations: defaultTestFixations });

  //   const expectedFields = [
  //     'link',
  //     'study',
  //     'analysis',
  //     'maxFixationGap',
  //     'minVisitDuration',
  //     'period',
  //     'minTimestep',
  //     'includeIncomplete',
  //     'participant',
  //     'stimulus',
  //     'visitNumber',
  //     'visitDuration',
  //     'stimulusWidth',
  //     'stimulusHeight',
  //     'stimulusArea',
  //     'visitStartTime',
  //     'visitEndTime',
  //     'fixationCount',
  //     'fixationFrequency',
  //     'hullNumber',
  //     'startPointIndex',
  //     'endPointIndex',
  //     'startTime',
  //     'endTime',
  //     'elapsedTime',
  //     'elapsedTimeNormalized',
  //     'hullPeriod',
  //     'timestep',
  //     'duration',
  //     'pointCount',
  //     'lastPointX',
  //     'lastPointY',
  //     'distance',
  //     'distanceX',
  //     'distanceY',
  //     'velocity',
  //     'velocityX',
  //     'velocityY',
  //     'centroidX',
  //     'centroidY',
  //     'centroidDistance',
  //     'centroidDistanceX',
  //     'centroidDistanceY',
  //     'coverage',
  //     'coverageDuration',
  //     'averageCoverage',
  //     'finalCoverage',
  //     'averageVelocity',
  //     'averageVelocityX',
  //     'averageVelocityY',
  //     'averageCentroidVelocity',
  //     'averageCentroidVelocityX',
  //     'averageCentroidVelocityY',
  //   ];

  //   expect(
  //     Object.keys(
  //       visit.getExportData({
  //         period: 5000,
  //         timestep: 100,
  //         includeIncomplete: false,
  //       })[0],
  //     ),
  //   ).to.eql(expectedFields);
  // });
});
