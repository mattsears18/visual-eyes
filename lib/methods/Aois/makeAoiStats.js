export function makeAoiStats(aoiId) {
  console.log('make aoi stats');

  /////// this function is no good as-is
  /////// need to sum from all datafiles
  /////// also need to consider if participant looks at an aoi, then another aoi, then returns to first aoi

  recordingTimeMin = Recordings.findOne({ aoiId: aoiId }, { sort: { recordingTime: 1 }}).recordingTime;
  recordingTimeMax = Recordings.findOne({ aoiId: aoiId }, { sort: { recordingTime: -1 }}).recordingTime;
  recordingTimeTotal = recordingTimeMax - recordingTimeMin;

  console.log('min: ' + recordingTimeMin);
  console.log('max: ' + recordingTimeMax);
  console.log('total: ' + recordingTimeTotal);

  Aois.update({ _id: aoiId }, { $set: {
    recordingTimeMin: recordingTimeMin,
    recordingTimeMax: recordingTimeMax,
    recordingTimeTotal: recordingTimeTotal,
  }});
}
