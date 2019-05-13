export default async function getStimuliOnly(data) {
  if (!data) { data = await this.getRenamedRows(); }
  return data.filter(row => (row.stimulusName && !(row.stimulusName.match(/\.avi|smiGlasses/))));
}
