// GLOBAL VARIABLES
var latitude,longitude;
var weatherAPI = '';
var isCelcius;
var weather = {};
var city;
var locationURL = 'http://ip-api.com/json/?callback=';

// SELECTOR VARIABLES
var elLocation = document.querySelector('#location');
var elWeather = document.querySelector('#weather');
var elTemperature = document.querySelector('#temperature');
var elTempButton = document.querySelector('#tempButton');
var elSky = document.querySelector('#sky');
var elGround = document.querySelector('#ground');

elTempButton.onclick = degreeSwap;


function getLocation(url) {
  var request = new XMLHttpRequest ();
  request.open('GET', url, true);
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      var data = JSON.parse(request.responseText);
      city = data.city;
      latitude = data.lat;
      longitude = data.lon;
      weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude.toString() + '&lon=' + longitude.toString() + '&appid=9fe1126f3544e9ea311e7312dca99844';
      sendRequestWeather(weatherAPI);
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
      weather.tempC = toC(data.main.temp);
      weather.tempF = toF(data.main.temp);
      weather.main = data.weather[0].main;
      weather.desc = data.weather[0].description;
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


// var speed = 5;
function createRain(dropSize, interval) {
  var canvas = document.getElementById('sky');
  var ctx = canvas.getContext('2d');
  var W = window.innerWidth;
  var H = window.innerHeight;
  // var gradientBackground = ctx.createLinearGradient(0,0,0,H);

  canvas.width = W;
  canvas.height = H;

  var num = 200;
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push({
      x: Math.random() * W,
      y: Math.random() * H,
      w: 2,
      h: Math.random() * 30,
      s: Math.random() * 10 + 2
    });
  } // End for loop

  function raindrops() {
    ctx.clearRect(0,0,W,H);
    // gradientBackground.addColorStop(0,'#9FAAB6');
    // gradientBackground.addColorStop(1,'#5C7894');
    // ctx.fillStyle = gradientBackground;
    // ctx.fillRect(0,0,W,H);
    for(var i = 0; i < num; i++) {
      ctx.fillStyle = 'rgba(0, 51, 102,0.2)';
      ctx.fillRect(arr[i].x, arr[i].y, arr[i].w, arr[i].h);
    }

    makeItRain();

  }
  function makeItRain() {
    for(var i = 0; i< num; i++){
      arr[i].y += arr[i].s;
      if(arr[i].y > H){
        arr[i].y =- arr[i].h;
      }
    }
  }
  setInterval(raindrops, interval);
}//End createRain Function




function update(weather) {
  isCelcius = false;
  elTemperature.innerHTML = weather.tempF;
  elLocation.innerHTML = city;
  elWeather.innerHTML = weather.desc;
  switch(weather.main) {
  case 'Rain':
    createRain(20,10);
    break;
  case 'Snow':
    elSky.classList.add('sky-cloudy', 'snow');
    break;
  case 'Clouds':
    createRain(20,10);
    break;

  }
}
