import helpers from '../../../lib/helpers';

export default function filterSortFloat(field, data) {
  let rows = [...data];

  rows = rows.filter(row => helpers.isFloaty(row[field]));
  return rows.sort((a, b) => parseFloat(a[field]) - parseFloat(b[field]));
}
