export default function getVisualIntakesOnly(data) {
  if(data && data[0] && data[0].hasOwnProperty('category')) {
    return data.filter(row => row.category == 'Visual Intake');
  } else {
    return data;
  }
}
