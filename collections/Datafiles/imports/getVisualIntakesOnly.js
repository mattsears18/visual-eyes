export default async function getVisualIntakesOnly(data) {
  if (!data) {
    data = await this.getRenamedRows();
  }
  return data.filter(row => row.category === 'Visual Intake');
}
