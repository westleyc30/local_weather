// GLOBAL VARIABLES
var lat = '';
var lon = '';
var weatherAPI = '';
var data;

// SELECTOR VARIABLES
var elLocation = document.querySelector('#location');


// LATITUDE AND LONGITUDE
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position){
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat.toString() + '&lon=' + lon.toString() + '&appid=9fe1126f3544e9ea311e7312dca99844';
    elLocation.innerHTML ='latitude: ' + lat + ' ' + 'longitude: ' + lon;
  });
}

$.document.ready(function() {
  $.getJSON(weatherAPI, function(){
    console.log(JSON.stringify(json));
  });
});

// var request = new XMLHttpRequest();
// request.open('GET', weatherAPI, true);
// request.send();
// data = request.responseText;

// request.onload = function() {
//   if (request.status >= 200 && request.status < 400) {
//     // Success!
//     // var data = request.responseText;
//   } else {
//     // We reached our target server, but it returned an error
//
//   }
// };
//
// request.onerror = function() {
//   // There was a connection error of some sort
// };

// request.send();
// var data = request.responseText;
//
// console.log(data);