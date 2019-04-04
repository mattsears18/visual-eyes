export default function getVisualIntakesOnly(data) {
  if(!data || !data[0]) throw new Error('noDataReceived');
  return data.filter(row => row.category == 'Visual Intake');
}
