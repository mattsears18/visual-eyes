export default async function getRenamedRows() {
  return this.renameHeaders(await this.getRawCSV());
}
