# Steps to Process raw Datafiles

- [ ] Datafiles.process() (async)
  - [x] .getRawCSV() (async)
  - [x] .preProcess(rawCSVData)
    - [x] .removeHeaders()
      - Works but still need tests
    - [x] .setFileFormat(rawCSVData)
      - [x] .detectFileFormat(rawCSVData)
  - [ ] .makeEyeevents(rawCSVData) (async) (bulk insert is async)
    - [x] .getAssignedRows(rawCSVData)
      - [x] .getRenamedRows(rawCSVData)
      - [x] .getStimuliOnly(renamedRows)
      - [x] .filterSortFloat(field, data)
      - [x] .assignStimuli(sortedRows)
      - [x] .assignAois(rowsWithStimuli)
    - [ ] .groupRowsByStimulus(assignedRows) - need to save aoiIds fixations
    - [ ] .generateSMIEyeevents(groupedRows) - need to save aoiIds for saccades and fixations
    - [ ] .generateImotionsEyeevents(groupedRows)
