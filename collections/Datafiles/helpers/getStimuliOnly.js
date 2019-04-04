export default function getStimuliOnly(data) {
  if(!data || !data[0]) throw new Error('noDataReceived');
  return data.filter(row => (row.stimulusName && !(row.stimulusName.match(/\.avi|smiGlasses/))));
}
