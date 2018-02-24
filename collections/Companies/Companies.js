import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Companies = new Mongo.Collection('companies');

Companies.allow({
  insert: function(userId, doc) {
    return true;
    if(!Roles.userIsInRole(userId, 'create', 'companies')) {
      throw new Meteor.Error('companies.create.unauthorized',
        'You do not have permission to create companies.');
    } else {
      return true;
    }
  },
  update: function(userId, doc) {
    return true;
    company = Companies.findOne({_id: doc._id});
    return company.hasPermission('update');
  },
  remove: function(userId, doc) {
    return true;
    company = Companies.findOne({_id: doc._id});
    return company.hasPermission('destroy');
  },
});

Schemas.Company = new SimpleSchema({
  name: {
    type: String,
    label: 'Name',
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

Companies.attachSchema(Schemas.Company);

export default Companies;
