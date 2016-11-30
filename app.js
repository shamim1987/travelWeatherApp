var APPID = '9fa53fa43aee027ccddf17a69acbea83'
var temp
var loc
var icon
var humidity
var wind
var direction
//var submit

function update (weather) {
  icon.src = 'imgs/codes/' + weather.code + '.png'
  humidity.innerHTML = weather.humidity
  wind.innerHtml = weather.wind
  direction.innerHTML = weather.direction
  loc.innerHTML = weather.location
  temp.innerHTML = weather.temp
}

window.onload = function () {
  temp = document.getElementById('temperature')
  loc = document.getElementById('location')
  icon = document.getElementById('icon')
  humidity = document.getElementById('humidity')
  wind = document.getElementById('wind')
  direction = document.getElementById('direction')
  submit = document.getElementById('btn')

    /* NEW */
  if (!navigator.geolocation) {
    var showPosition = function (position) {
	    updateByGeo(position.coords.latitude, position.coords.longitude)
    } /
    navigator.geolocation.getCurrentPosition(showPosition)
  }
  // else if (true) {
  //   var zip = window.prompt('Could not discover your location. What is your zip code?')
  //   updateByZip(zip)
  // }
   else {

     submit.addEventListener('click', function () {
      var input = document.getElementById('city')
      var cityName= input.value
      console.log(cityName)
      updateByQuery(cityName)
    })

    //var cityName = window.prompt('Where you at?')
    //updateByQuery(cityName)
  }
}

/* NEW */

function updateByGeo (lat, lon) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?' +
	'lat=' + lat +
	'&lon=' + lon +
	'&APPID=' + APPID
  sendRequest(url)
}

function updateByZip (zip) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?' +
	'zip=' + zip +
	'&APPID=' + APPID
  sendRequest(url)
}

function updateByQuery (cityName) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=' +
  cityName + '&APPID=' + APPID
  sendRequest(url)
}

function sendRequest (url) {
  var xmlhttp = new XMLHttpRequest()
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var data = JSON.parse(xmlhttp.responseText)
	    var weather = {}
	    weather.code = data.weather[0].id
	    weather.humidity = data.main.humidity
	    weather.wind = data.wind.speed
	    /* NEW */
	    weather.direction = degreesToDirection(data.wind.deg)
	    weather.location = data.name
	    /* NEW */
	    weather.temp = K2F(data.main.temp)
	    update(weather)
    }
  }

  xmlhttp.open('GET', url, true)
  xmlhttp.send()
}

function degreesToDirection (degrees) {
  var range = 360 / 16
  var low = 360 - range / 2
  var high = (low + range) % 360
  var angles = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  for (i in angles) {
    if (degrees >= low && degrees < high) {
	    console.log(angles[i])
	    return angles[i]
	    console.log('derp')
    }
    low = (low + range) % 360
    high = (high + range) % 360
  }
  return 'N'
}

function K2F (k) {
  return Math.round(k * (9 / 5) - 459.67)
}

function K2C (k) {
  return Math.round(k - 273.15)
}

// find city
