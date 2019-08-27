export default function getExportData(opt) {
  const { period } = opt || {};
  const { timestep } = opt || {};
  const includeIncomplete = opt || {};
  let { samplingStep } = opt || {};

  if (Meteor.isClient) {
    // console.log(
    //   `visit.getExportData() ${this.participant().name} - ${
    //     this.stimulus().name
    //   } - ${this.number}`,
    // );
  }

  if (typeof samplingStep === 'undefined') {
    samplingStep = 0;
  }

  let data = [];

  const fields = {
    link: `${Meteor.absoluteUrl()}studies/${
      this.analysis().study()._id
    }/analyses/${this.analysisId}/${this.participantId}/${this.stimulusId}/${
      this.number
    }`,
    study: this.study().name,
    pointsType: this.study().pointsType(),
    analysis: this.analysis().name,
    maxVisitGapDuration: this.analysis().maxVisitGapDuration,
    minVisitDuration: this.analysis().minVisitDuration,
  };

  if (typeof period !== 'undefined') {
    fields.period = period;
    fields.minTimestep = timestep;
    fields.includeIncomplete = includeIncomplete ? 'true' : 'false';
  }

  fields.participant = this.participant().name;
  fields.stimulus = this.stimulus().name;
  fields.visitNumber = this.number;
  fields.visitDuration = this.duration;
  fields.stimulusWidth = this.stimulus().width;
  fields.stimulusHeight = this.stimulus().height;
  fields.stimulusArea = this.stimulus().area();
  fields.visitStartTime = this.startTime;
  fields.visitEndTime = this.endTime;
  fields.visitDuration = this.duration;
  fields.gazepointCount = this.gazepointCount;
  fields.gazepointFrequency = this.gazepointFrequency;
  fields.fixationCount = this.fixationCount;
  fields.fixationFrequency = this.fixationFrequency;
  fields.fixationProportion = this.getFixationProportion();

  if (typeof period === 'undefined') {
    // just return basic stats about the visit
    data = fields;

    this.participant()
      .variables()
      .forEach(function(variable) {
        data[variable.name] = variable.value;
      });
  } else {
    const hullseries = this.getHullseries(opt);
    const hulls = hullseries.getHulls();

    hulls.forEach((hull, hi) => {
      const hullData = {
        ...fields,
        hullNumber: hull.number,
        startPointIndex: hull.startIndex,
        endPointIndex: hull.endIndex,
        startTime: hull.startTime(),
        endTime: hull.endTime(),
        elapsedTime: hull.elapsedTime(),
        elapsedTimeNormalized: hull.elapsedTime() / hullseries.getDuration(),
        hullPeriod: hull.period(),
        timestep: hull.timestep(),
        duration: hull.duration(),
        pointCount: hull.getPoints().length,
        lastPointX: hull.lastPoint().x,
        lastPointY: hull.lastPoint().y,
        distance: hull.distance(),
        distanceX: hull.distance('x'),
        distanceY: hull.distance('y'),
        velocity: hull.velocity(),
        velocityX: hull.velocity('x'),
        velocityY: hull.velocity('y'),
        centroidX: hull.getCentroid({ which: 'x' }),
        centroidY: hull.getCentroid({ which: 'y' }),
        centroidDistance: 0,
        centroidDistanceX: 0,
        centroidDistanceY: 0,
        // centroidVelocity: 0,
        // centroidVelocityX: 0,
        // centroidVelocityY: 0,
        coverage: hull.getCoverage({
          width: this.stimulus().width,
          height: this.stimulus().height,
        }),
        coverageDuration: hull.coverageDuration({
          width: this.stimulus().width,
          height: this.stimulus().height,
        }),
        averageCoverage: hullseries.getAverageCoverage(),
        finalCoverage: hullseries.getFinalCoverage(),
        averageVelocity: hullseries.getAverageVelocity(),
        averageVelocityX: hullseries.getAverageVelocity({ which: 'x' }),
        averageVelocityY: hullseries.getAverageVelocity({ which: 'y' }),
        averageCentroidVelocity: hullseries.getAverageCentroidVelocity(),
        averageCentroidVelocityX: hullseries.getAverageCentroidVelocity({
          which: 'x',
        }),
        averageCentroidVelocityY: hullseries.getAverageCentroidVelocity({
          which: 'y',
        }),
      };

      if (hi > 0) {
        hullData.centroidDistanceX = hulls[hi].getCentroid().x - hulls[hi - 1].getCentroid().x;
        hullData.centroidDistanceY = hulls[hi].getCentroid().y - hulls[hi - 1].getCentroid().y;
        if (
          hullData.centroidDistanceX !== 0
          || hullData.centroidDistanceY !== 0
        ) {
          hullData.centroidDistance = Math.sqrt(
            hullData.centroidDistanceX * hullData.centroidDistanceX
              + hullData.centroidDistanceY * hullData.centroidDistanceY,
          );
        }
        // if (hullData.timestep > 0 && hullData.centroidDistance > 0) {
        //   hullData.centroidVelocity = hullData.centroidDistance / hullData.timestep;
        //   hullData.centroidVelocityX = hullData.centroidDistanceX / hullData.timestep;
        //   hullData.centroidVelocityY = hullData.centroidDistanceY / hullData.timestep;
        // }
      }

      data.push(hullData);
    });
  }

  if (samplingStep > 0) {
    data = this.getSampledData(data, samplingStep);
  }

  return data;
}
