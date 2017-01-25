// GLOBAL VARIABLES
var latitude,longitude;
var weatherAPI = '';
var isCelcius;
var weather = {};
var forecast = {};
var city;
var state;
var locationURL = 'http://ip-api.com/json/?callback=';

// SELECTOR VARIABLES
var elCity        = document.querySelector('.city');
var elState       = document.querySelector('.state');
var elWeather     = document.querySelector('#weather');
var elTempCurrent = document.querySelector('.tempCurrent');
var elTempMin     = document.querySelector('.tempMin');
var elTempMax     = document.querySelector('.tempMax');
var elTempButton  = document.querySelector('#tempButton');
var elSky         = document.querySelector('#sky');
var elGround      = document.querySelector('#ground');
var elIconMain    = document.querySelector('.icon-main')
var elIcon        = document.querySelector('.icon');
var week = [
    [
        document.querySelector('.day1 .icon'),
        document.querySelector('.day1 .desc'),
        document.querySelector('.day1 .tempHigh'),
        document.querySelector('.day1 .tempLow'),
    ],
    [
        document.querySelector('.day2 .icon'),
        document.querySelector('.day2 .desc'),
        document.querySelector('.day2 .tempHigh'),
        document.querySelector('.day2 .tempLow'),
    ],
    [
        document.querySelector('.day3 .icon'),
        document.querySelector('.day3 .desc'),
        document.querySelector('.day3 .tempHigh'),
        document.querySelector('.day3 .tempLow'),
    ],
    [
        document.querySelector('.day4 .icon'),
        document.querySelector('.day4 .desc'),
        document.querySelector('.day4 .tempHigh'),
        document.querySelector('.day4 .tempLow'),
    ],
    [
        document.querySelector('.day5 .icon'),
        document.querySelector('.day5 .desc'),
        document.querySelector('.day5 .tempHigh'),
        document.querySelector('.day5 .tempLow'),
    ],
    [
        document.querySelector('.day6 .icon'),
        document.querySelector('.day6 .desc'),
        document.querySelector('.day6 .tempHigh'),
        document.querySelector('.day6 .tempLow'),
    ]
];
var sheet = document.styleSheets[0];

elTempButton.onclick = degreeSwap;


function getLocation(url) {
  var request = new XMLHttpRequest ();
  request.open('GET', url, true);
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      var data = JSON.parse(request.responseText);
      city = data.city;
      state = data.region;
      latitude = data.lat;
      longitude = data.lon;
      weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude.toString() + '&lon=' + longitude.toString() + '&appid=9fe1126f3544e9ea311e7312dca99844';
      forecastAPI = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' +latitude.toString() + '&lon=' + longitude.toString() + '&appid=9fe1126f3544e9ea311e7312dca99844';
      sendRequestWeather(weatherAPI);
      sendRequestForecast(forecastAPI);
    }
  };
  request.send();
}

getLocation(locationURL);

function sendRequestWeather(url) {
  var request = new XMLHttpRequest ();
  request.open('GET', url, true);
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      // SUCCESSFUL loading
      var data = JSON.parse(request.responseText);

      weather.tempC    = toC(data.main.temp);
      weather.tempF    = toF(data.main.temp);
      weather.tempMinF = toF(data.main.temp_min);
      weather.tempMaxF = toF(data.main.temp_max);
      weather.tempMinC = toC(data.main.temp_min);
      weather.tempMaxC = toC(data.main.temp_max);
      weather.main     = data.weather[0].main;
      weather.desc     = data.weather[0].description;
      weather.city     = data.name;
    //   update(weather);
    }
  };
  request.send();
}

function sendRequestForecast(url) {
  var request = new XMLHttpRequest ();
  request.open('GET', url, true);
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
        var data = JSON.parse(request.responseText);
        forecast.highs = [];
        forecast.lows = [];
        forecast.main = [];
        // forecast.
        for (var i = 1; i < data.list.length; i++) {
            forecast.lows.push(data.list[i].temp.min);
            forecast.highs.push(data.list[i].temp.max);
            forecast.main.push(data.list[i].weather[0].main);

        }
        console.log(forecast.lows);
        console.log(forecast.highs);
        console.log(forecast.main);
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
    elTempCurrent.innerHTML = weather.tempF;
    for (var i = 0; i < week.length; i++) {
        week[i][2].innerHTML = toF(forecast.highs[i]);
        week[i][3].innerHTML = toF(forecast.lows[i]);
    }
    // elTempMin.innerHTML = weather.tempMinF;
    // elTempMax.innerHTML = weather.tempMaxF;
  } else {
    isCelcius = true;
    elTempCurrent.innerHTML = weather.tempC;
    for (var i = 0; i < week.length; i++) {
        week[i][2].innerHTML = toC(forecast.highs[i]);
        week[i][3].innerHTML = toC(forecast.lows[i]);
    }
    // elTempMin.innerHTML = weather.tempMinC;
    // elTempMax.innerHTML = weather.tempMaxC;
  }
}

// ADDS ICONS FOR THE DIFFERENT WEATHER TYPES
function iconAdd(type, day) {
    switch (type) {
        case 'Rain':
            day.innerHTML = '<i class="wi wi-showers"></i>'
            break;
        case 'Snow':
          day.innerHTML = '<i class="wi wi-snowflake-cold"></i>'
          break;
        case 'Clouds':
          day.innerHTML = '<i class="wi wi-cloudy"></i>';
          break;
        case 'Clear':
          day.innerHTML = '<i class="wi wi-day-sunny"></i>';
          break;
        case 'Haze':
          day.innerHTML = '<i class="wi wi-dust"></i>';
          break;
        case 'Mist':
          day.innerHTML = '<i class="wi wi-dust"></i>';
          break;
        case 'Fog':
          day.innerHTML = '<i class="wi wi-dust"></i>';
          break;
        default:
            console.log('Hi');
    }
}


// UPDATES TO CURRENT WEATHER
function update(weather) {
  isCelcius = false;
  elTempCurrent.innerHTML = weather.tempF;
  elCity.innerHTML = city;
  elState.innerHTML = state;
  elWeather.innerHTML = weather.desc;

  switch(weather.main) {
  case 'Rain':
    // createRain(20,10);
    sheet.insertRule('html {background:url(../img/rain.jpg) no-repeat center center fixed;-webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover;background-size: cover;}', 1);
    elIconMain.innerHTML = '<i class="wi wi-showers"></i>';
    sheet.insertRule('main { background:hsla(204, 62%, 54%,.9)}',1);
    break;
  case 'Snow':
    sheet.insertRule('html {background:url(..//img/snow.jpg) no-repeat center center fixed;-webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover;background-size: cover;}', 1);
    sheet.insertRule('main { background:hsla(0, 0%, 50%, 0.5)}',1);
    break;
  case 'Clouds':
    sheet.insertRule('html {background:url(..//img/cloudy.jpg) no-repeat center center fixed;-webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover;background-size: cover;}', 1);
    sheet.insertRule('main { background:hsla(0, 0%, 50%, 0.5)}',1);
    elIconMain.innerHTML = '<i class="wi wi-cloudy"></i>';
    // createRain(20,10);
    break;
  case 'Clear':
    sheet.insertRule('html {  background:url(..//img/clear.jpg) no-repeat center center fixed;-webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover;background-size: cover;}', 1);
    sheet.insertRule('main { background:hsla(25, 64%, 49%,.9)}',1);
    elIconMain.innerHTML = '<i class="wi wi-day-sunny"></i>';
    // sheet.insertRule('main { content:\'\'; position: absolute; top:0;left:0;bottom:0;right:0; background: linear-gradient(background: hsla(27, 63%, 61%,.8),background: hsla(27, 63%, 61%,.8)) }',1);
    break;
  case 'Haze':
    sheet.insertRule('html {  background:url(..//img/fog.jpg) no-repeat center center fixed;-webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover;background-size: cover;}', 1);
    sheet.insertRule('main { background:hsla(0, 0%, 50%, 0.5)}',1);
    elIconMain.innerHTML = '<i class="wi wi-dust"></i>';
    break;
  case 'Mist':
    sheet.insertRule('html {  background:url(..//img/fog.jpg) no-repeat center center fixed;-webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover;background-size: cover;}', 1);
    sheet.insertRule('main { background:hsla(0, 0%, 50%, 0.5)}',1);
    elIconMain.innerHTML = '<i class="wi wi-dust"></i>';
    break;
  case 'Fog':
    sheet.insertRule('html {  background:url(..//img/fog.jpg) no-repeat center center fixed;-webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover;background-size: cover;}', 1);
    sheet.insertRule('main { background:hsla(0, 0%, 50%, 0.5)}',1);
    elIconMain.innerHTML = '<i class="wi wi-dust"></i>';
    break;
  }
  for (var i = 0; i < week.length; i++) {
    //   console.log(forecast.main);
      week[i][1].innerHTML = forecast.main[i];
      week[i][2].innerHTML = toF(forecast.highs[i]);
      week[i][3].innerHTML = toF(forecast.lows[i]);
      iconAdd(forecast.main[i], week[i][0]);
  }
}
