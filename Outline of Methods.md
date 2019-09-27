# Outline of Methods

## VisitHullSeries

- [ ] new VisitHullSeries()
  - [ ] .getCentroidTrace()
  - [ ] .getCentroidTrailTrace()
  - [ ] .getFrameData()
  - [ ] .getLastPointTrace()
  - [ ] .getLayout()
  - [ ] .getPointsTimeText()
  - [ ] .getPointsTrace()
  - [ ] .getPointTrail()
  - [ ] .getPointTrailTrace()
  - [ ] .getPolygonTrace()
  - [ ] .getTraces()

## Visits

- [ ] .getExportData()
  - [ ] .getHullSeries()
  - [ ] .getSampleData()
- [ ] .getFixations()
- [ ] .getGlanceSaccade()

## Analyses

- [x] .makeVisits()
  - [x] .getVisitEndIndex()
  - [x] .makeVisit()
- [x] .getExportData()

## Datafiles

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
