export default function getVisualIntakesOnly(data) {
  if(!data || !data[0]) throw new Error('noDataReceived');

  // check if any rows have 'category'
  let categories = false;
  let i = 0;
  while(data[i] && !categories) {
    if(data[i].hasOwnProperty('category')) {
      categories = true;
    }
    i++;
  }

  if(!categories) throw new Error('noCategories');

  return data.filter(row => row.category == 'Visual Intake');
}
