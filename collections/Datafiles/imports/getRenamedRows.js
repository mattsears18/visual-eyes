export default async function getRenamedRows(data) {
  if (!data) { data = await this.getRawCSV(); }
  if (!data.length) return [];

  const rows = this.renameHeaders(data);
  return this.filterSortFloat('timestamp', rows);
}
