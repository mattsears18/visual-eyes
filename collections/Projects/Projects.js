import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Projects = new Mongo.Collection('projects');

Projects.allow({
  insert: function(userId, doc) {
    return true;
    if(!Roles.userIsInRole(userId, 'create', 'projects')) {
      throw new Meteor.Error('projects.create.unauthorized',
        'You do not have permission to create projects.');
    } else {
      return true;
    }
  },
  update: function(userId, doc) {
    return true;
    project = Projects.findOne({_id: doc._id});
    return project.hasPermission('update');
  },
  remove: function(userId, doc) {
    return true;
    project = Projects.findOne({_id: doc._id});
    return project.hasPermission('destroy');
  },
});

Schemas.Project = new SimpleSchema({
  name: {
    type: String,
    label: 'Name',
  },
  placeId: {
    type: 'select2',
    label: 'Place',
    optional: true,
    autoform: {
      type: 'select2',
      options: function() {
        results = Places.find({}).map(function(c) {
          return {
            label: c.name + ' (' + helpers.address(c) + ')',
            value: c._id
          };
        });

        results.unshift({
          label: 'Select One',
          value: ''
        });

        return results;
      },
    },
  },
  desc: {
    type: String,
    label: 'Description',
    autoform: {
      rows: 8
    },
    optional: true,
  },
}, {tracker: Tracker});

Projects.attachSchema(Schemas.Project);

export default Projects;
