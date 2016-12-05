var openWeatherAppId = '9fa53fa43aee027ccddf17a69acbea83',
  openWeatherUrl = 'http://api.openweathermap.org/data/2.5/forecast'

  // Initialize Firebase
var config = {
  apiKey: 'AIzaSyDetsWY2WEsxPVrWMrWfwi_76ddUVup1SU',
  authDomain: 'travel-weather-1480309624931.firebaseapp.com',
  databaseURL: 'https://travel-weather-1480309624931.firebaseio.com',
  storageBucket: 'travel-weather-1480309624931.appspot.com',
  messagingSenderId: '1049911185636'
}
firebase.initializeApp(config)

var cityList = document.getElementById('cityList')
var wrapper = document.getElementById('wrapper')
// var database = firebase.database()
// var cityWeatherRefObj = database.ref().child('cityWeather')
// var cityNameRefObj = database.ref().child(cityName)
// var cityName = cityNameRefObj.child('')
// var comment// = cityNameRefObj.child('comment'),
  // author = comment.child('author'),
  // title = comment.child('title'),
  // body = comment.child('body')
// var dateTime// = cityNameRefObj.child(date),
  // condition = dateTime.child('condition'),
  // temperature = dateTime.child('temperature'),
  // wind = dateTime.child('wind')
  // var dbRefList = dbRefObj.child('hobbies')

var prepareData = function (units) {
    // Replace loading image
  var cityName = $('#city-name').val()
    // Make ajax call, callback
  if (cityName && cityName != '') {
    cityName = cityName.trim()
    getData(openWeatherUrl, cityName, openWeatherAppId, units)
  } else {
    alert('Please enter the city name')
  }
}
$(document).ready(function () {
  $('.btn-metric').click(function () {
    prepareData('metric')
  })
  $('.btn-imperial').click(function () {
    prepareData('imperial')
  })
})
function getData (url, cityName, appId, units) {
  var request = $.ajax({
    url: url,
    dataType: 'jsonp',
    data: {
      q: cityName,
      appid: appId,
      units: units
    },
    jsonpCallback: 'fetchData',
    type: 'GET'
  }).fail(function (error) {
    console.error(error)
    alert('Error sending request')
  })
}
function fetchData (forecast) {
  console.log(forecast)
  var selectedCity = '',
    cityName = forecast.city.name,
    country = forecast.city.country

  selectedCity += '<h3> Weather Forecast for ' + cityName + ', ' + country + '</h3>'
  forecast.list.forEach(function (forecastEntry) {
    var date = forecastEntry.dt_txt
    var temperature = forecastEntry.main.temp
    selectedCity += '<tr>' + '<td>' + date + '</td>' +
     '<td>' + temperature + '</td>' + '</tr>'
  })
  var savebutn = $('<button/>', {
    id: 'save',
    text: 'Save City',
    click: function () {
      console.log('it works')

      // add city to DB
      var database = firebase.database()
      var savedCity = database.ref().child(cityName)

      forecast.list.forEach(function (forecastEntry) {
        var date = forecastEntry.dt_txt
        var temperature = forecastEntry.main.temp
        var savedDate = savedCity.child(date)
        var savedTemp = savedDate.child('Temp').set(temperature)
      })

      // get city from DB
// var fetchedData = JSON.parse(database.get(savedCity))

      // render data to page

      // cityWeatherRefObj.on('value', snap => { cityList.innerText = JSON.stringify(snap.val(), null, 4)})
    // dbRefObj.on('value', snap => { object.innerText = JSON.stringify(snap.val(), null, 4)})

      // sync DB

  /*  dbRefList.on('child_added', snap => {
      var li = document.createElement('li')
      li.innerText = snap.val()
      uL.appendChild(li)
    }) */
    }
  })

  $('#log').html(selectedCity)
  $('#log').append(savebutn)
}
/*
function saveCity () {
  saveCity = $('#save').click(function(){

  })
}
*/
