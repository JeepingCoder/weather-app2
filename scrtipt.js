var key = "be3a1c546ba346651be769db457cb1b7";

var button = document.querySelector("#searchBtn");
var inputValue = document.querySelector("search-bar");
var currentCard = document.querySelector("#currentCard");
var forecastBox = document.querySelector("#forecast-box");
var cityBox = document.querySelector(".citySearch")
var cityNames = JSON.parse(localStorage.getItem("cities")) || [];
var savedCities = document.querySelector(".cityContainer")

//find a way to get the lattitude and longitude for the city using the api//
function getLatLng(city) {
  var geo =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&appid=be3a1c546ba346651be769db457cb1b7";
  fetch(geo)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;

      getCurrent(lat, lon);
    });
}
//using lat and lon pull the weather information from api//
function getCurrent(lat, lon) {
  var forecast =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial" +
    "&appid=" +
    key;
  fetch(forecast)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //create card for the data to be displayed//
      var cardDiv = document.createElement("div");
      cardDiv.setAttribute("class", "card");

      var titleEl = document.createElement("h2");
      titleEl.setAttribute("class", "card-title");
      titleEl.textContent = data.name;

      var tempEl = document.createElement("p");
      tempEl.textContent = "Temperature: " + data.main.temp + " °F ";

      var humidityEl = document.createElement("p");
      humidityEl.textContent = "Humidity: " + data.main.humidity + " % ";

      var windEl = document.createElement("p");
      windEl.textContent = "Wind: " + data.wind.speed + " mph ";

      var iconEl = document.createElement("img");
      iconEl.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
     

      cardDiv.appendChild(titleEl);
      cardDiv.appendChild(tempEl);
      cardDiv.appendChild(humidityEl);
      cardDiv.appendChild(windEl);
      cardDiv.appendChild(iconEl);

      currentCard.appendChild(cardDiv);
    });
  console.log(lat, lon);
  getForecast(lat, lon);
}

//use api to find the 5 day forecast//
function getForecast(lat, lon) {
  console.log(lat, lon);
  var forecast =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial" +
    "&appid=" +
    key;
  fetch(forecast)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
     //only need one hour selection to display, index through hours select 12pm to display// 
      for (var i = 0; i < data.list.length; i++) {
        var targetDate = data.list[i].dt_txt.split(" ")[1];
        if (targetDate === "12:00:00") {
          
          console.log(data.list[i]);
      //create cards for the 5 days to display the data on//
          var cardDiv = document.createElement("div");
          cardDiv.setAttribute("class", "card");

          var titleEl = document.createElement("h2");
          titleEl.setAttribute("class", "card-title");
          titleEl.textContent = data.city.name;

          var tempEl = document.createElement("p");
          tempEl.textContent = "Temperature: " + data.list[i].main.temp + " °F ";

          var humidityEl = document.createElement("p");
          humidityEl.textContent ="Humidity: " + data.list[i].main.humidity + " % " ;

          var windEl = document.createElement("p");
          windEl.textContent = "Wind: " + data.list[i].wind.speed + " mph ";

          var iconEl = document.createElement("img");
      iconEl.src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png"

          cardDiv.appendChild(titleEl);
          cardDiv.appendChild(tempEl);
          cardDiv.appendChild(humidityEl);
          cardDiv.appendChild(windEl);
          cardDiv.appendChild(iconEl);


          forecastBox.appendChild(cardDiv);
        }
      }
    });
}

//use local storage to display previous user searches from local history//
function createButton(){
  savedCities.textContent= ""
  for (var i = 0; i < cityNames.length; i++){
    var cityBtn = document.createElement("button");
    cityBtn.textContent = cityNames[i];
  // add a class and style with css//
  document.getElementById(cityBtn);
    savedCities.appendChild(cityBtn);
    document.getElementById("ctyBtn").setAttribute("class","cityBtn");
  }
  
}


button.addEventListener("click", function () {
  var city = document.querySelector(".search-bar").value;
  getLatLng(city);
  cityNames.push(city);
  localStorage.setItem("cities", JSON.stringify(cityNames));
  createButton();
});
// get help on key down event listener//
cityBox.addEventListener("keyup", function(event){
  event.preventDefault();
  if (event.keyCode === 13) {
   var city = document.querySelector(".search-bar").value;
    getLatLng(city);
    cityNames.push(city);
    localStorage.setItem("cities", JSON.stringify(cityNames));
    createButton();
}

});
createButton();