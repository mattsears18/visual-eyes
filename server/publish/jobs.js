import Jobs from "../../collections/Jobs/Jobs";

////////////////////////////////////////////////////////////////////////////////
// Jobs Publications
////////////////////////////////////////////////////////////////////////////////
Meteor.startup(function() {
  Meteor.publish("jobs.all", function() {
    return Jobs.find({});
  });
});

Meteor.startup(function() {
  Meteor.publish("jobs.byAnalysisId", function(analysisId) {
    check(analysisId, String);
    return Jobs.find({ "data.analysisId": analysisId });
  });
});
