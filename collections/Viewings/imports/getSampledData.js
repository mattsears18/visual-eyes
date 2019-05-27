export default function getSampledData(d, step) {
  const stepPercents = [];

  for (let s = 0; s < 100; s += parseFloat(step)) {
    stepPercents.push(s / 100);
  }

  stepPercents.push(1);

  const sampledData = [];

  for (let i = 0; i < stepPercents.length; i += 1) {
    const index = d.findIndex(function(row) {
      return row.elapsedTimeNormalized >= stepPercents[i];
    });

    // console.log('=====');
    // console.log(stepPercents[i]);
    // console.log(d[index].elapsedTimeNormalized);

    sampledData.push(d[index]);
  }
  return sampledData;
}
