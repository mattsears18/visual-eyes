import '../../factories.test';

import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Gaze.getExportData()', () => {
  it('has no period', () => {
    const gaze = Factory.create('gaze');
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
      'fixationProportion',
    ];

    expect(Object.keys(gaze.getExportData())).to.eql(expectedFields);
  });

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
        gaze.getExportData({
          period: 5000,
          timestep: 100,
          includeIncomplete: false,
        })[0],
      ),
    ).to.eql(expectedFields);
  });
});
