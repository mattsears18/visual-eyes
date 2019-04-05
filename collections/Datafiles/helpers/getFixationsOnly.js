export default async function getFixationsOnly(data) {
  if(!data) { data = await this.getRenamedRows() }

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
