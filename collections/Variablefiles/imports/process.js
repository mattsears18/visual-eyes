const csv = require('csvtojson');

export default function process() {
  if (!this.study()) throw new Error('noStudy');

  const study = this.study();

  console.log("Create any variables that don't already exist");
  csv({ delimiter: 'auto' })
    .fromFile(this.path)
    .then(
      Meteor.bindEnvironment((rows) => {
        for (upvar in rows[0]) {
          if (upvar != 'Name' && upvar != 'name') {
            variable = Variables.findOne({ studyId: study._id, name: upvar });
            if (!variable) {
              Variables.insert({ name: upvar, studyId: study._id });
              console.log(`Create ${upvar}`);
            }
          }
        }

        // Save participant variable values
        console.log('Save participant variable values');
        rows.forEach(function(row) {
          if (row.name) {
            participantName = row.name;
          } else if (row.Name) {
            participantName = row.Name;
          }

          if (typeof participantName !== 'undefined') {
            participant = Participants.findOne({
              studyId: study._id,
              name: participantName,
            });

            if (participant) {
              newVariableVals = [];
              for (upvar in row) {
                if (upvar != 'Name' && upvar != 'name') {
                  variable = Variables.findOne({
                    studyId: study._id,
                    name: upvar,
                  });
                  if (variable) {
                    // console.log('update participant: ' + participant.name + ', variable: ' + variable.name + ', value: ' + row[upvar]);
                    newVariableVals.push({
                      variableId: variable._id,
                      value: row[upvar],
                    });
                  }
                }
              }

              if (participant.variableVals) {
                variableVals = participant.variableVals.filter(function(
                  variableVal,
                ) {
                  hasVar = false;
                  newVariableVals.forEach(function(newVariableVal) {
                    if (newVariableVal.variableId === variableVal.variableId) {
                      hasVar = true;
                    }
                  });
                  return !hasVar;
                });
              } else {
                variableVals = [];
              }
              //
              // console.log('variableVals');
              // console.log(variableVals);
              // console.log('newVariableVals');
              // console.log(newVariableVals);
              //
              // console.log('===========');
              variableVals = variableVals.concat(newVariableVals);

              Participants.update(
                { _id: participant._id },
                { $set: { variableVals } },
              );
            }
          }
        });
      }),
    );
}
