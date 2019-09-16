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

- [x] .process() (async) (not working for imotions yet - fine for now)
  - [x] .preProcess()
  - [x] .getRawData() (async)
  - [x] .mergeVideoStimulusRows(rawData)
    - [x] .removeHeaders()
      - Works but still need tests
    - [x] .setFileFormat(rawData)
      - [x] .detectFileFormat(rawData)
    - [x] .getName()
  - [x] .renameRows(timestampedData)
  - [x] .makeEyeevents(renamedRows) (async) (bulk insert is async)
    - [x] .getValidCoordinatesOnly(renamedRows)
    - [x] .getAssignedRows(validCoordinateRows) (not working for imotions yet - fine for now)
      - [x] .assignStimuli(validCoordinateRows)
      - [x] .assignAois(rowsWithStimuli)
    - [ ] .generateImotionsEyeevents(assignedRows) (not working for imotions yet - fine for now)
    - [x] .generateSMIEyeevents(assignedRows)
