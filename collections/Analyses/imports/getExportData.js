import { jStat } from 'jStat';

import Datafiles from '../../Datafiles/Datafiles';
import Participants from '../../Participants/Participants';
import Viewings from '../../Viewings/Viewings';
import helpers from '../../../lib/helpers';

export default function getExportData(opt) {
  const { period } = opt || {};
  const { timestep } = opt || {};
  const includeIncomplete = opt || {};

  const data = [];

  const participants = Participants.find({
    _id: { $in: this.participantIds },
  }).fetch();

  participants.forEach((participant) => {
    const viewings = Viewings.find({
      analysisId: this._id,
      participantId: participant._id,
    }).fetch();

    const datafiles = Datafiles.find({ _id: { $in: participant.datafileIds } });

    const viewingCounts = helpers.getViewingCounts(viewings);

    const viewingDurations = viewings.map(function(viewing) {
      return viewing.duration;
    });

    const participantData = {
      link: `${Meteor.absoluteUrl()}studies/${this.study()._id}/participants/${
        participant._id
      }`,
      study: this.study().name,
      pointsType: this.study().pointsType(),
      analysis: this.name,
      viewingGap: this.viewingGap,
      minViewingTime: this.minViewingTime,
    };

    if (typeof period !== 'undefined') {
      participantData.period = period;
      participantData.minTimestep = timestep;
      participantData.includeIncomplete = includeIncomplete ? 'true' : 'false';
    }

    participantData.participant = participant.name;
    participantData.viewingCountPerStimulus = viewingCounts;
    participantData.viewingCountPerStimulusMean = jStat.mean(viewingCounts);
    participantData.viewingCountPerStimulusMedian = jStat.median(viewingCounts);
    participantData.viewingCountPerParticipant = jStat.sum(viewingCounts);
    participantData.viewingDurationPerStimulus = viewingDurations;
    participantData.viewingDurationPerStimulusMean = jStat.mean(
      viewingDurations,
    );
    participantData.viewingDurationPerStimulusMedian = jStat.median(
      viewingDurations,
    );
    participantData.viewingDurationPerParticipant = jStat.sum(viewingDurations);
    participantData.rawRowCount = jStat.sum(
      datafiles.map(datafile => datafile.rawRowCount),
    );
    participantData.gazepointCount = jStat.sum(
      datafiles.map(datafile => datafile.gazepointCount),
    );
    participantData.gazepointProportion = jStat.sum(datafiles.map(datafile => datafile.gazepointCount))
      / jStat.sum(datafiles.map(datafile => datafile.rawRowCount));
    participantData.fixationCount = jStat.sum(
      datafiles.map(datafile => datafile.fixationCount),
    );
    participantData.fixationProportion = jStat.sum(datafiles.map(datafile => datafile.fixationCount))
      / jStat.sum(datafiles.map(datafile => datafile.gazepointCount));
    participant.variables().forEach(function(variable) {
      participantData[variable.name] = variable.value;
    });

    if (typeof period !== 'undefined') {
      console.log('balls');

      viewings.forEach((viewing) => {
        const hullseries = viewing.getHullseries({
          period,
          timestep,
          includeIncomplete: !!includeIncomplete,
        });

        console.log(hullseries);
      });

      participantData.averageCoverage = ''; // hullseries.getAverageCoverage();
      participantData.averageVelocity = ''; // hullseries.getAverageVelocity();
      participantData.averageVelocityX = ''; // hullseries.getAverageVelocity({which: 'x',});
      participantData.averageVelocityY = ''; // hullseries.getAverageVelocity({which: 'x',});
      participantData.averageCentroidVelocity = ''; // hullseries.getAverageCentroidVelocity();
      participantData.averageCentroidVelocityX = ''; // hullseries.getAverageCentroidVelocity({ which: 'x',},);
      participantData.averageCentroidVelocityY = ''; // hullseries.getAverageCentroidVelocity({ which: 'y'});

      // const hulls = hullseries.getHulls();
      // hulls.forEach((hull, hi) => {
      //   const hullData = {
      //     ...fields,
      //     hullNumber: hull.number,
      //     startPointIndex: hull.startIndex,
      //     endPointIndex: hull.endIndex,
      //     startTime: hull.startTime(),
      //     endTime: hull.endTime(),
      //     elapsedTime: hull.elapsedTime(),
      //     elapsedTimeNormalized: hull.elapsedTime() / hullseries.getDuration(),
      //     hullPeriod: hull.period(),
      //     timestep: hull.timestep(),
      //     duration: hull.duration(),
      //     pointCount: hull.getPoints().length,
      //     lastPointX: hull.lastPoint().x,
      //     lastPointY: hull.lastPoint().y,
      //     distance: hull.distance(),
      //     distanceX: hull.distance('x'),
      //     distanceY: hull.distance('y'),
      //     velocity: hull.velocity(),
      //     velocityX: hull.velocity('x'),
      //     velocityY: hull.velocity('y'),
      //     centroidX: hull.getCentroid({ which: 'x' }),
      //     centroidY: hull.getCentroid({ which: 'y' }),
      //     centroidDistance: 0,
      //     centroidDistanceX: 0,
      //     centroidDistanceY: 0,
      //     centroidVelocity: 0,
      //     centroidVelocityX: 0,
      //     centroidVelocityY: 0,
      //     coverage: hull.getCoverage({
      //       width: this.stimulus().width,
      //       height: this.stimulus().height,
      //     }),
      //     coverageDuration: hull.coverageDuration({
      //       width: this.stimulus().width,
      //       height: this.stimulus().height,
      //     }),
      //     averageCoverage: hullseries.getAverageCoverage(),
      //     averageVelocity: hullseries.getAverageVelocity(),
      //     averageVelocityX: hullseries.getAverageVelocity({ which: 'x' }),
      //     averageVelocityY: hullseries.getAverageVelocity({ which: 'x' }),
      //     averageCentroidVelocity: hullseries.getAverageCentroidVelocity(),
      //     averageCentroidVelocityX: hullseries.getAverageCentroidVelocity({
      //       which: 'x',
      //     }),
      //     averageCentroidVelocityY: hullseries.getAverageCentroidVelocity({
      //       which: 'y',
      //     }),
      //   };
      //   if (hi > 0) {
      //     hullData.centroidDistanceX =
      //       hulls[hi].getCentroid().x - hulls[hi - 1].getCentroid().x;
      //     hullData.centroidDistanceY =
      //       hulls[hi].getCentroid().y - hulls[hi - 1].getCentroid().y;
      //     if (hullData.centroidDistanceX > 0 || hullData.centroidDistanceY > 0) {
      //       hullData.centroidDistance = Math.sqrt(
      //         hullData.centroidDistanceX * hullData.centroidDistanceX +
      //           hullData.centroidDistanceY * hullData.centroidDistanceY,
      //       );
      //     }
      //     if (hullData.timestep > 0 && hullData.centroidDistance > 0) {
      //       hullData.centroidVelocity =
      //         hullData.centroidDistance / hullData.timestep;
      //       hullData.centroidVelocityX =
      //         hullData.centroidDistanceX / hullData.timestep;
      //       hullData.centroidVelocityY =
      //         hullData.centroidDistanceY / hullData.timestep;
      //     }
      //   }
      //   data.push(hullData);
      // });
    }

    data.push(participantData);
  });

  return data;
}
