export function makeDatafileStats(datafileId) {
  console.log('make datafile stats');

  // recordingTimeMin = Recordings.findOne({ datafileId: datafileId }, { sort: { recordingTime: 1 }}).recordingTime;
  // recordingTimeMax = Recordings.findOne({ datafileId: datafileId }, { sort: { recordingTime: -1 }}).recordingTime;
  // recordingTimeTotal = recordingTimeMax - recordingTimeMin;
  //
  // console.log('min: ' + recordingTimeMin);
  // console.log('max: ' + recordingTimeMax);
  // console.log('total: ' + recordingTimeTotal);
  //
  // Datafiles.update({ _id: datafileId }, { $set: {
  //   recordingTimeMin: recordingTimeMin,
  //   recordingTimeMax: recordingTimeMax,
  //   recordingTimeTotal: recordingTimeTotal,
  // }});
}
