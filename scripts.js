var latitude = '';
var longitude = '';
var elLocation = document.querySelector('#location');

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    elLocation.innerHTML ='latitude: ' + latitude + ' ' + 'longitude: ' + longitude;
  });
}
// elLocation.innerHTML = 'latitude:' + latitude + ' ' + 'longitude:' + longitude;
