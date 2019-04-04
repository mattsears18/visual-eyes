const csv = require('csvtojson');

function getPoints() {
  if(this.study().fixationsOnly) {
    return this.getFixations();
  } else {
    return this.getGazepoints();
  }
}

function getFixations() {
  let gazepoints = this.getGazepoints();
  let fixations = this.getFixationsOnly(gazepoints);
  console.log(helpers.formatNumber(fixations.length) + ' fixations');
  if(!this.fixationCount) {
    this.fixationCount = fixations.length;
    Datafiles.update({ _id: this._id }, { $set: { fixationCount: this.fixationCount }});
  }
  return fixations;
}

async function getGazepoints() {
  let rows = await this.getRenamedRows();

  let rawRows = this.getNumericPositiveCoordinatesOnly(rows);
  console.log(helpers.formatNumber(rawRows.length) + ' raw rows');
  if(!this.rawRowCount) {
    this.rawRowCount = rawRows.length;
    Datafiles.update({ _id: this._id}, { $set: { rawRowCount: this.rawRowCount }});
  }

  let visualRows = this.getVisualIntakesOnly(rawRows);
  console.log(helpers.formatNumber(visualRows.length) + ' visual intake rows');

  let dupGazepoints = this.getStimuliOnly(visualRows);
  console.log(helpers.formatNumber(dupGazepoints.length) + ' gazepoints (with duplicates)');
  if(!this.dupGazepointCount) {
    this.dupGazepointCount = dupGazepoints.length;
    Datafiles.update({ _id: this._id }, { $set: { dupGazepointCount: dupGazepoints.length }});
  }

  let gazepoints = this.getNonDuplicateCoordinatesOnly(dupGazepoints);
  console.log(helpers.formatNumber(gazepoints.length) + ' gazepoints');
  if(!this.gazepointCount) {
    this.gazepointCount = gazepoints.length;
    Datafiles.update({ _id: this._id }, { $set: { gazepointCount: gazepoints.length }});
  }

  return gazepoints;
}

async function getRenamedRows() {
  return this.renameHeaders(await this.getRawCSV());
}

function getRawCSV() {
  return csv({delimiter: "auto"}).fromFile(this.path);
}

function renameHeaders(rows) {
  let headers;

  if(this.fileFormat == 'smi') {
    headers = [
      {'original': 'RecordingTime [ms]',                'new': 'timestamp'},
      {'original': 'Time of Day [h:m:s:ms]',            'new': 'timeOfDay'},
      {'original': 'Category Binocular',                'new': 'category'},
      {'original': 'Index Binocular',                   'new': 'fixationIndex'},
      {'original': 'Point of Regard Binocular X [px]',  'new': 'x'},
      {'original': 'Point of Regard Binocular Y [px]',  'new': 'y'},
      {'original': 'Stimulus',                          'new': 'stimulusName'},
      {'original': 'AOI Name Binocular',                'new': 'aoiName'},
    ];
  } else if(this.fileFormat == 'imotions') {
    headers = [
      {'original': 'Timestamp',     'new': 'timestamp'},
      {'original': 'FixationSeq',   'new': 'fixationIndex'},
      {'original': 'GazeX',         'new': 'x'},
      {'original': 'GazeY',         'new': 'y'},
      {'original': 'StimulusName',  'new': 'stimulusName'},
      {'original': 'GazeAOI',       'new': 'aoiName'},
    ];
  } else{
    throw { error: "noFileFormat" };
  }

  let cleanData = [];
  rows.forEach((row, ri) => {
    let cleanRow = {};
    headers.forEach((header) => {
      if(row.hasOwnProperty(header.original)) {
        cleanRow[header.new] = row[header.original];
      }
    });

    cleanData.push(cleanRow);
  });

  return cleanData;
}

function getNumericPositiveCoordinatesOnly(data) {
  return data.filter(row => {
    return (
      Number.isInteger(parseInt(row.x)) &&
      Number.isInteger(parseInt(row.y)) &&
      parseInt(row.x) >= 0 &&
      parseInt(row.y) >= 0
    );
  });
}

function getVisualIntakesOnly(data) {
  if(data && data[0] && data[0].hasOwnProperty('category')) {
    return data.filter(row => row.category == 'Visual Intake');
  } else {
    return data;
  }
}

function getStimuliOnly(data) {
  // remove any rows with ".avi" or "smiGlasses" in stimulusName
  return data.filter((row) => {
    if(row.stimulusName.match(/\.avi|smiGlasses/)) {
      return false;
    } else {
      return true;
    }
  });
}

function getNonDuplicateCoordinatesOnly(data) {
  let i = 0;
  while(i < data.length - 1) {
    if(
      (parseInt(data[i].x) == parseInt(data[i + 1].x)) &&
      (parseInt(data[i].y) == parseInt(data[i + 1].y)) &&
      (data[i].stimulusName == data[i + 1].stimulusName) &&
      (data[i].aoiName == data[i + 1].aoiName)
    ) {
      data.splice(i + 1, 1); // remove the following duplicate point;
    } else {
      i++;
    }
  }

  return data;
}

function getFixationsOnly(data) {
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

export {
  getRawCSV,
  renameHeaders,
  getRenamedRows,
  getNumericPositiveCoordinatesOnly,
  getVisualIntakesOnly,
  getStimuliOnly,
  getNonDuplicateCoordinatesOnly,
  getGazepoints,
  getFixationsOnly,
  getFixations,
  getPoints,
};
