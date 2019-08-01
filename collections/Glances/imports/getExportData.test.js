import '../../factories.test';

import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Glance.getExportData()', () => {
  it('has no period', () => {
    const glance = Factory.create('glance');
    const expectedFields = [
      'link',
      'study',
      'pointsType',
      'analysis',
      'minGlanceDuration',
      'maxGlanceGapDuration',
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
    ];

    expect(Object.keys(glance.getExportData())).to.eql(expectedFields);
  });

  it('has a period', () => {
    const glance = Factory.create('glanceWithGazepoints');

    const expectedFields = [
      'link',
      'study',
      'pointsType',
      'analysis',
      'minGlanceDuration',
      'maxGlanceGapDuration',
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
      // 'centroidVelocity',
      // 'centroidVelocityX',
      // 'centroidVelocityY',
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
        glance.getExportData({
          period: 5000,
          timestep: 100,
          includeIncomplete: false,
        })[0],
      ),
    ).to.eql(expectedFields);
  });
});
