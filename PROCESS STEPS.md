# Steps to Process raw Datafiles

- [ ] Datafiles.process() (async)
  - [x] .getRawCSV() (async)
  - [x] .preProcess(rawCSVData)
    - [x] .removeHeaders()
      - Works but still need tests
    - [x] .setFileFormat(rawCSVData)
      - [x] .detectFileFormat(rawCSVData)
  - [ ] .makeEyeevents(rawCSVData)
    - [ ] .getAssignedRows(rawCSVData)
      - I think it works but still need tests
      - [x] .getRenamedRows(rawCSVData)
      - [x] .getStimuliOnly()
      - [x] .recomputeTimestamps()
      - [x] .filterSortFloat()
      - [x] .assignStimuli()
      - [x] .assignAois()
    - [ ] .generateEyeevents(assignedRows)
