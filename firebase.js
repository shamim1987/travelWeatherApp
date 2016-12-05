// Initialize Firebase
var config = {
  apiKey: "AIzaSyDetsWY2WEsxPVrWMrWfwi_76ddUVup1SU",
  authDomain: "travel-weather-1480309624931.firebaseapp.com",
  databaseURL: "https://travel-weather-1480309624931.firebaseio.com",
  storageBucket: "travel-weather-1480309624931.appspot.com",
  messagingSenderId: "1049911185636"
};
firebase.initializeApp(config)

var fire = document.getElementById('fire')
var database = firebase.database()
var object = document.getElementById('object')
var uL = document.getElementById('list')
var dbRefObj = database.ref().child('object')
var dbRefList = dbRefObj.child('hobbies')
//sync obj changes
dbRefObj.on('value', snap => {
  object.innerText = JSON.stringify(snap.val(), null, 4)
})

//sync list changes
dbRefList.on('child_added', snap => {
  var li = document.createElement('li')
  li.innerText = snap.val()
  uL.appendChild(li)

})
