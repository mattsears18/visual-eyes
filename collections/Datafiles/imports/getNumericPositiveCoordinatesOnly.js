import helpers from '../../../lib/helpers';

export default async function getNumericPositiveCoordinatesOnly(data) {
  if (!data) {
    data = await this.getRenamedRows();
  }
  return data.filter(
    row => helpers.isFloaty(parseFloat(row.x))
      && helpers.isFloaty(parseFloat(row.y))
      && parseFloat(row.x) >= 0
      && parseFloat(row.y) >= 0,
  );
}
