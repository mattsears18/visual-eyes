Variablefiles.collection.before.insert(function (userId, doc) {
  doc.studyId = doc.meta.studyId;
});
