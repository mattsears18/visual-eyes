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
  - [x] .getRawData() (async)
  - [x] .preProcess(rawData)
    - [x] .removeHeaders()
      - Works but still need tests
    - [x] .setFileFormat(rawData)
      - [x] .detectFileFormat(rawData)
    - [x] .getName()
  - [x] .renameRows(rawData)
  - [x] .makeEyeevents(renamedRows) (async) (bulk insert is async)
    - [x] .getAssignedRows(renamedRows)
      - [x] .getStimuliOnly(renamedRows)
      - [x] .getValidCoordinatesOnly(renamedRows)
      - [x] .filterSortFloat(field, data)
      - [x] .assignStimuli(sortedRows)
      - [x] .assignAois(rowsWithStimuli)
    - [x] .groupRowsByStimulus(assignedRows)
    - [x] .groupRowsByAoi(assignedRows)
    - [x] .generateImotionsEyeevents(groupedRows)
    - [x] .generateSMIEyeevents(groupedRows)
