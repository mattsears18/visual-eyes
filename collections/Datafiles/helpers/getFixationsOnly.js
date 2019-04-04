export default function getFixationsOnly(data) {
  let goodRows = [];
  let indices = [];

  data.forEach((row) => {
    if(Number.isInteger(parseInt(row.fixationIndex))){
      let ref = row.fixationIndex + ', ' + row.aoiName;
      if(!indices.includes(ref)) {
        indices.push(ref);
        goodRows.push(row);
      }
    }
  });

  return goodRows;
}
