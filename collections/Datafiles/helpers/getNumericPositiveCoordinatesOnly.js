export default function getNumericPositiveCoordinatesOnly(data) {
  return data.filter(row => {
    return (
      Number.isInteger(parseInt(row.x)) &&
      Number.isInteger(parseInt(row.y)) &&
      parseInt(row.x) >= 0 &&
      parseInt(row.y) >= 0
    );
  });
}
