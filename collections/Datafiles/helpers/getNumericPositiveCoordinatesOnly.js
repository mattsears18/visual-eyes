export default async function getNumericPositiveCoordinatesOnly(data) {
  if(!data) { data = await this.getRenamedRows() }
  return data.filter(row => {
    return (
      Number.isInteger(parseInt(row.x)) &&
      Number.isInteger(parseInt(row.y)) &&
      parseInt(row.x) >= 0 &&
      parseInt(row.y) >= 0
    );
  });
}
