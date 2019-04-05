export default async function getFixations(data) {
  if(!data) { data = await this.getAllGazepoints() }

  let goodRows = [];
  let indices = [];

  data.forEach((row) => {
    if(Number.isInteger(parseInt(row.fixationIndex))){
      let ref = row.fixationIndex + ', ' + row.stimulusName;
      if(!indices.includes(ref)) {
        indices.push(ref);
        goodRows.push(row);
      }
    }
  });

  return goodRows;
}
