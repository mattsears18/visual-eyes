export default async function getRenamedRows() {
  const data = await this.getRawCSV();

  if (!data.length) return [];

  return this.renameHeaders(data);
}
