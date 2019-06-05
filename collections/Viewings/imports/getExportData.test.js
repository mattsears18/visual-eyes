import '../../factories.test';

import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Viewing.getExportData()', () => {
  it('has no period', () => {
    const viewing = Factory.create('viewing');
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
      'fixationProportion',
    ];

    expect(Object.keys(viewing.getExportData())).to.eql(expectedFields);
  });

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
        viewing.getExportData({
          period: 5000,
          timestep: 100,
          includeIncomplete: false,
        })[0],
      ),
    ).to.eql(expectedFields);
  });
});
