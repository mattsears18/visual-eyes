// Global helpers go here

helpers = {
  coinFlip: () => {
    return (Math.floor(Math.random() * 2) == 0);
  },
  address: (place) => {
    address = '';
    if(place.street) { address += place.street + ', '; }
    if(place.street2) { address += place.street2 + ', '; }
    if(place.city) { address += place.city + ', '; }
    if(place.state) { address += place.state + ', '; }
    if(place.zip) { address += place.zip; }

    return address;
  }
}

export default helpers;
