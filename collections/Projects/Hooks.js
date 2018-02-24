import Projects from './Projects';

Projects.before.insert(function (userId, doc) {
  doc.createdAt = new Date;
  doc.userPermissions = {
    'update':               [userId],
    'destroy':              [userId],
    'createWorkpackages':   [userId],
    'createSubmittals':     [userId],
    'createDrawings':       [userId],
    'createSpecifications': [userId],
  }
});

Projects.after.remove(function (userId, doc) {
  workpackages = Workpackages.find({projectId: doc._id});
  workpackages.forEach(function(doc) {
    Workpackages.remove(doc._id);
  });

  submittals = Submittals.find({projectId: doc._id});
  submittals.forEach(function(doc) {
    Submittals.remove(doc._id);
  });

  drawings = Drawings.find({projectId: doc._id});
  drawings.forEach(function(doc) {
    Drawings.remove(doc._id);
  });

  specifications = Specifications.find({projectId: doc._id});
  specifications.forEach(function(doc) {
    Specifications.remove(doc._id);
  });
});
