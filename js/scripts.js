// GLOBAL VARIABLES
var lat = '';
var lon = '';
var weatherAPI = '';
var isCelcius;
var weather = {};
var locationURL = 'http://ipinfo.io/json?callback=JSON_CALLBACK';

// SELECTOR VARIABLES
var elLocation = document.querySelector('#location');
var elWeather = document.querySelector('#weather');
var elTemperature = document.querySelector('#temperature');
var elTempButton = document.querySelector('#tempButton');

elTempButton.onclick = degreeSwap;


// LATITUDE AND LONGITUDE
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position){
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat.toString() + '&lon=' + lon.toString() + '&appid=9fe1126f3544e9ea311e7312dca99844';
    sendRequestWeather(weatherAPI);
  });
}

function sendRequestWeather(url) {
  var request = new XMLHttpRequest ();
  request.open('GET', url, true);
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      // SUCCESSFUL loading
      var data = JSON.parse(request.responseText);
      weather.tempC = toC(data.main.temp);
      weather.tempF = toF(data.main.temp);
      weather.desc = data.weather[0].main;
      weather.city = data.name;
      update(weather);
    }
  };
  request.send();
}


function toC(k) {
  return Math.round(k - 273.15) + '&deg' + 'C';
}

function toF(k) {
  return Math.round(k * 9/5 - 459.67) + '&deg' + 'F';
}

function degreeSwap() {
  if (isCelcius) {
    isCelcius = false;
    elTemperature.innerHTML = weather.tempF;
  } else {
    isCelcius = true;
    elTemperature.innerHTML = weather.tempC;
  }
}

function update(weather) {
  isCelcius = false;
  elTemperature.innerHTML = weather.tempF;
  elLocation.innerHTML = weather.city;
  elWeather.innerHTML = weather.desc;
}
