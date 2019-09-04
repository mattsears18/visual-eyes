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
      'maxVisitGapDuration',
      'minVisitDuration',
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
      // 'fixationProportion',
    ];

    expect(Object.keys(visit.getExportData())).to.eql(expectedFields);
  });

  it('has a period', () => {
    const visit = Factory.create('visit', { fixations: defaultTestFixations });

    const expectedFields = [
      'link',
      'study',
      'analysis',
      'maxVisitGapDuration',
      'minVisitDuration',
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
      // 'fixationProportion',
      'hullNumber',
      'startPointIndex',
      'endPointIndex',
      'startTime',
      'endTime',
      'elapsedTime',
      'elapsedTimeNormalized',
      'hullPeriod',
      'timestep',
      'duration',
      'pointCount',
      'lastPointX',
      'lastPointY',
      'distance',
      'distanceX',
      'distanceY',
      'velocity',
      'velocityX',
      'velocityY',
      'centroidX',
      'centroidY',
      'centroidDistance',
      'centroidDistanceX',
      'centroidDistanceY',
      'coverage',
      'coverageDuration',
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
        visit.getExportData({
          period: 5000,
          timestep: 100,
          includeIncomplete: false,
        })[0],
      ),
    ).to.eql(expectedFields);
  });
});
