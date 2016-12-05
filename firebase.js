

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDetsWY2WEsxPVrWMrWfwi_76ddUVup1SU",
    authDomain: "travel-weather-1480309624931.firebaseapp.com",
    databaseURL: "https://travel-weather-1480309624931.firebaseio.com",
    storageBucket: "travel-weather-1480309624931.appspot.com",
    messagingSenderId: "1049911185636"
  };
  firebase.initializeApp(config)
  var cityList = document.getElementById('cityList')
  var database = firebase.database()
  var wrapper = document.getElementById('wrapper')
  var cityWeatherRefObj = database.ref().child('cityWeather')
  var cityNameRefObj = cityWeatherRefObj.child('cityName')
  var cityName = cityNameRefObj.child('')
  var comment = cityName.child('comment'),
  author = comment.child('author'),
  body = comment.child('body')
  var dateTime = cityName.child(''),
  condition=dateTime.child('condition'),
  temperature = dateTime.child('temperature'),
  wind = dateTime.child('wind')
  //var dbRefList = dbRefObj.child('hobbies')

  //sync city weather ref obj changes
  dbRefObj.on('value', snap => {
    object.innerText = JSON.stringify(snap.val(), null, 4)
  })

  //sync list changes
  dbRefList.on('child_added', snap => {
    var li = document.createElement('li')
    li.innerText = snap.val()
    uL.appendChild(li)

  })
