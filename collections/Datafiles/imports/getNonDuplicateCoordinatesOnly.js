export default function getNonDuplicateCoordinatesOnly(data) {
  let i = 0;
  while (i < data.length - 1) {
    if (
      parseInt(data[i].x, 10) === parseInt(data[i + 1].x, 10)
      && parseInt(data[i].y, 10) === parseInt(data[i + 1].y, 10)
      && data[i].stimulusName === data[i + 1].stimulusName
    ) {
      data.splice(i + 1, 1); // remove the following duplicate point;
    } else {
      i++;
    }
  }

  return data;
}
