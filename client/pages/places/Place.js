Template.Place.onCreated(function() {
  var self = this;
  markers = [];

  self.autorun(function() {
    var placeId = FlowRouter.getParam('placeId');
    self.subscribe('places.single', placeId);

    place = Places.findOne(placeId);

    if(place && place.ownerId) {
      self.subscribe('companies.single', place.ownerId);
    }

    GoogleMaps.ready('googleMap', function(map) {
      map.instance.setCenter({lat: place.lat, lng: place.lng});

      marker = new google.maps.Marker({
        position: {lat: place.lat, lng: place.lng},
        map: map.instance,
      });

      markers.push(marker);
    });
  });

  Places.find().observeChanges({   // <===== find
    changed: function (id, fields) {
      if(fields.lat && fields.lng) {
        map = GoogleMaps.maps.googleMap;

        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }

        map.instance.setCenter({lat: fields.lat, lng: fields.lng});
        var marker = new google.maps.Marker({
          position: {lat: fields.lat, lng: fields.lng},
          map: map.instance,
        });

        markers.push(marker);
      }
    }
  });
});

Template.Place.helpers({
  place: () => {
    return Places.findOne();
  },
  mapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(0, 0),
        // mapTypeId: 'satellite',
        zoom: 18
      };
    }
  }
});

Template.BreadCrumbs.helpers({
  place: () => {
    return Places.findOne();
  },
});

Template.Place.events({
  'click .update-place': function() {
    Session.set('updatePlace', true);
  }
});

Template.Place.destroyed = function(){
  Session.set('updatePlace', false);
}
