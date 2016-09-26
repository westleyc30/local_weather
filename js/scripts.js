// GLOBAL VARIABLES
var lat = '';
var lon = '';
var weatherAPI = '';

// SELECTOR VARIABLES
var elLocation = document.querySelector('#location');
var elWeather = document.querySelector('#weather');
var elTemperature = document.querySelector('#temperature');


// LATITUDE AND LONGITUDE
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position){
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat.toString() + '&lon=' + lon.toString() + '&appid=9fe1126f3544e9ea311e7312dca99844';
    elLocation.innerHTML ='latitude: ' + lat + ' ' + 'longitude: ' + lon;
    sendRequest(weatherAPI);
  });
}

function sendRequest(url) {
  var request = new XMLHttpRequest ();
  request.open('GET', url, true);
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      // SUCCESSFUL loading
      var data = JSON.parse(request.responseText);
      var weather = {};
      weather.tempC = Math.round(data.main.temp - 273.15) + '&deg';
      weather.tempF = Math.round(weather.tempC * (9 / 5) + 32) + '&deg';
      weather.desc = data.weather[0].main;
      weather.city = data.name;
      update(weather);
    }
  };
  request.send();
}

function update(weather) {
  elTemperature.innerHTML = weather.tempF;
  elLocation.innerHTML = weather.city;
  elWeather.innerHTML = weather.desc;
}
