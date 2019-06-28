export default function getSampledData(d, step) {
  if (typeof step === 'undefined') {
    throw new Error('noStep');
  }

  if (parseFloat(step) < 0 || parseFloat(step) > 100) {
    throw new Error('invalidStep');
  }

  if (parseFloat(step) === 0) {
    return d;
  }

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

    sampledData.push(d[index]);
  }
  return sampledData;
}
