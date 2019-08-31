# VisitHullSeries

- [x] new VisitHullSeries()
  - [x] .getCentroidTrace()
  - [x] .getCentroidTrailTrace()
  - [x] .getFrameData()
  - [x] .getLastPointTrace()
  - [x] .getLayout()
  - [x] .getPointsTimeText()
  - [x] .getPointsTrace()
  - [x] .getPointTrail()
  - [x] .getPointTrailTrace()
  - [x] .getPolygonTrace()
  - [x] .getTraces()

# Visits

- [x] .getExportData()
- [x] .getHullSeries()
- [x] .getSampleData()

# Analyses

- [x] .makeVisits()
  - [x] .getVisitEndIndex()
  - [x] .makeVisit()
- [x] .getExportData()

# Datafiles

- [x] .process() (async)
  - [x] .getRawCSV() (async)
  - [x] .preProcess(rawCsvData)
    - [x] .removeHeaders()
      - Works but still need tests
    - [x] .setFileFormat(rawCsvData)
      - [x] .detectFileFormat(rawCsvData)
    - [x] .getName()
  - [x] .makeEyeevents(rawCsvData) (async) (bulk insert is async)
    - [x] .getAssignedRows(rawCsvData)
      - [x] .getRenamedRows(rawCsvData)
      - [x] .getStimuliOnly(renamedRows)
      - [x] .getValidCoordinatesOnly(renamedRows)
      - [x] .filterSortFloat(field, data)
      - [x] .assignStimuli(sortedRows)
      - [x] .assignAois(rowsWithStimuli)
    - [x] .groupRowsByStimulus(assignedRows)
    - [x] .groupRowsByAoi(assignedRows)
    - [x] .generateImotionsEyeevents(groupedRows)
    - [x] .generateSMIEyeevents(groupedRows)
