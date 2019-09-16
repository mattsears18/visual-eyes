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

- [ ] .process() (async)
  - [x] .getRawData() (async)
  - [x] .preProcess(rawData)
    - [x] .removeHeaders()
      - Works but still need tests
    - [x] .setFileFormat(rawData)
      - [x] .detectFileFormat(rawData)
    - [x] .getName()
  - [x] .renameRows(rawData)
  - [ ] .makeEyeevents(renamedRows) (async) (bulk insert is async)
    - [x] .getValidCoordinatesOnly(renamedRows)
    - [ ] .getAssignedRows(renamedRows)
      - [x] .assignStimuli(sortedRows)
      - [x] .assignAois(rowsWithStimuli)
    - [ ] .generateImotionsEyeevents(groupedRows)
    - [ ] .generateSMIEyeevents(groupedRows)
