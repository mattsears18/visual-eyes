Gazepoints.before.insert(function (userId, doc) {
  doc.createdAt = new Date;
});
