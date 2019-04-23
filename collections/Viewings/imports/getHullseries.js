export default function getHullseries({
  period,
  timestep,
  includeIncomplete,
}) {

  let hullseriesId = helpers.findOrInsert('hullseries', {
    viewingId: this._id,
    period: period,
    timestep: timestep,
    includeIncomplete: includeIncomplete,
  });

  return Hullseries.findOne({ _id: hullseriesId });
}
