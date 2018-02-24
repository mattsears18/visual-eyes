import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Places = new Mongo.Collection('places');

Places.allow({
  insert: function(userId, doc) {
    return true;
    if(!Roles.userIsInRole(userId, 'create', 'places')) {
      throw new Meteor.Error('places.create.unauthorized',
        'You do not have permission to create places.');
    } else {
      return true;
    }
  },
  update: function(userId, doc) {
    return true;
    place = Places.findOne({_id: doc._id});
    return place.hasPermission('update');
  },
  remove: function(userId, doc) {
    return true;
    place = Places.findOne({_id: doc._id});
    return place.hasPermission('destroy');
  },
});

Schemas.Place = new SimpleSchema({
  name: {
    type: String,
    label: 'Name',
  },
  ownerId: {
    type: 'select2',
    label: 'Owner',
    optional: true,
    autoform: {
      type: 'select2',
      options: function() {
        results = Companies.find({}).map(function(c) {
          return {
            label: c.name,
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
  street: {
    type: String,
    label: 'Street',
  },
  street2: {
    type: String,
    label: 'Street 2',
    optional: true,
  },
  city: {
    type: String,
    label: 'City',
    optional: true,
  },
  state: {
    type: String,
    label: 'State',
    optional: true,
    autoform: {
      type: 'select',
      afFieldInput:{
        placeholder: 'Test1'
      },
      options: function (){
        return [
          {label:'', value: ''},
          {label:'AK', value: 'AK'},
          {label:'AL', value: 'AL'},
          {label:'AR', value: 'AR'},
          {label:'AZ', value: 'AZ'},
          {label:'CA', value: 'CA'},
          {label:'CO', value: 'CO'},
          {label:'CT', value: 'CT'},
          {label:'DE', value: 'DE'},
          {label:'FL', value: 'FL'},
          {label:'GA', value: 'GA'},
          {label:'HI', value: 'HI'},
          {label:'IA', value: 'IA'},
          {label:'ID', value: 'ID'},
          {label:'IL', value: 'IL'},
          {label:'IN', value: 'IN'},
          {label:'KS', value: 'KS'},
          {label:'KY', value: 'KY'},
          {label:'LA', value: 'LA'},
          {label:'MA', value: 'MA'},
          {label:'MD', value: 'MD'},
          {label:'ME', value: 'ME'},
          {label:'MI', value: 'MI'},
          {label:'MN', value: 'MN'},
          {label:'MO', value: 'MO'},
          {label:'MS', value: 'MS'},
          {label:'MT', value: 'MT'},
          {label:'NC', value: 'NC'},
          {label:'ND', value: 'ND'},
          {label:'NE', value: 'NE'},
          {label:'NH', value: 'NH'},
          {label:'NJ', value: 'NJ'},
          {label:'NM', value: 'NM'},
          {label:'NV', value: 'NV'},
          {label:'NY', value: 'NY'},
          {label:'OH', value: 'OH'},
          {label:'OK', value: 'OK'},
          {label:'OR', value: 'OR'},
          {label:'PA', value: 'PA'},
          {label:'RI', value: 'RI'},
          {label:'SC', value: 'SC'},
          {label:'SD', value: 'SD'},
          {label:'TN', value: 'TN'},
          {label:'TX', value: 'TX'},
          {label:'UT', value: 'UT'},
          {label:'VA', value: 'VA'},
          {label:'VT', value: 'VT'},
          {label:'WA', value: 'WA'},
          {label:'WI', value: 'WI'},
          {label:'WV', value: 'WV'},
          {label:'WY', value: 'WY'},
        ];
      }
    }
  },
  zip: {
    type: Number,
    label: 'Zip',
    optional: true,
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

Places.attachSchema(Schemas.Place);

export default Places;
