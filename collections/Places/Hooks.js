import Places from './Places';

Places.before.update(function (userId, doc, fieldNames, modifier, options) {
  if(Meteor.isServer) {
    var geo = new GeoCoder({
      httpAdapter: "https",
      apiKey: 'AIzaSyDRgZwstJSOSvJDsk_cFPMiKBUmqwUyVF8',
    });

    var result = geo.geocode(helpers.address(modifier.$set))[0];

    modifier.$set.googlePlace = result;
    modifier.$set.lat = result.latitude;
    modifier.$set.lng = result.longitude;

    delete modifier.$unset.lat;
    delete modifier.$unset.lng;
  }
});

Places.before.insert(function (userId, doc) {
  doc.createdAt = new Date;
  doc.userPermissions = {
    'update':   [userId],
    'destroy':  [userId],
  }

  if(Meteor.isServer) {
    var geo = new GeoCoder({
      httpAdapter: "https",
      apiKey: 'AIzaSyDRgZwstJSOSvJDsk_cFPMiKBUmqwUyVF8',
    });

    var result = geo.geocode(helpers.address(doc))[0];

    doc.googlePlace = result;

    doc.lat = result.latitude;
    doc.lng = result.longitude;
  }
});
