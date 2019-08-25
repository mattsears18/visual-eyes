# Steps to Process raw Datafiles

- [ ] Datafiles.process() (async)
  - [x] .getRawCSV() (async)
  - [x] .preProcess(rawCSVData)
    - [x] .removeHeaders()
      - Works but still need tests
    - [x] .setFileFormat(rawCSVData)
      - [x] .detectFileFormat(rawCSVData)
  - [ ] .makeEyeevents(rawCSVData)
    - [x] .getAssignedRows(rawCSVData)
      - [x] .getRenamedRows(rawCSVData)
      - [x] .getStimuliOnly(renamedRows)
      - [x] .filterSortFloat(field, data)
      - [x] .assignStimuli(sortedRows)
      - [x] .assignAois(rowsWithStimuli)
    - [x] .groupRowsByStimulus(assignedRows)
    - [ ] .generateEyeevents(groupedRows)
